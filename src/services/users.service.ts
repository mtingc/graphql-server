import ResolversOperationsService from './resolvers-operations.service';
import { IContextData } from './../interfaces/context-data.interface';
import { COLLECTIONS, EXPIRETIME, MESSAGES } from './../config/constants';
import {
    assignDocumentId,
    findOneElement,
    updateOneElement
} from './../lib/db-operations';
import JWT from './../lib/jwt';
import bcrypt from 'bcrypt';
import { IUser } from './../interfaces/user.interface';
import { createDetails, modifierDetails } from '../lib/details';

class UsersService extends ResolversOperationsService {

    private element = 'usuario';
    private collection = COLLECTIONS.USERS;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // User list
    async items() {
        const page = await this.getVariables().pagination?.page;
        const itemsPage = await this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            users: result.items
        };
    }

    // Get a user
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            user: result.item
        };
    }

    // Auth Token
    async auth() {
        const info = new JWT().verify(this.getContext().token!);
        if (info === MESSAGES.TOKEN_VERIFICATION_FAILED) {
            return {
                status: false,
                message: info,
                user: null
            };
        }
        return {
            status: true,
            message: `${this.element} authenticado mediante token.`,
            user: Object.values(info)[0]
        };
    }

    // LogIn
    async login() {
        try {
            const variables = this.getVariables().user;
            // Verify that the email is registered
            const user: IUser = await findOneElement(this.getDb(), this.collection, { email: variables?.email }) as unknown as IUser;
            if (user === null) {
                return {
                    status: false,
                    message: `El ${this.element} no existe.`,
                    token: null
                };
            }

            // Verify encrypted password
            const passwordCheck = bcrypt.compareSync(variables?.password || '', user.password || '');

            // Hide properties
            if (passwordCheck !== null) {
                delete user.password;
                delete user.birthday;
            }

            // Assign the date in ISO format in the lastSession property
            user.lastSession = new Date().toISOString();
            passwordCheck
                ? await updateOneElement(this.getDb(), this.collection, { email: variables?.email }, { lastSession: user.lastSession })
                : null;

            return {
                status: passwordCheck,
                message:
                    !passwordCheck
                        ? 'Contraseña y correo no correctos, sesión no iniciada'
                        : 'Usuario cargado correctamente.',
                token:
                    !passwordCheck
                        ? null
                        : new JWT().sign({ user }, EXPIRETIME.H24),
                user:
                    !passwordCheck
                        ? null
                        : user
            };
        } catch (error) {
            return {
                status: false,
                message: `Error al cargar el ${this.element}.`,
                token: null
            };
        }
    }

    // User registration
    async register() {

        const user = this.getVariables().user;

        // Check not to be empty
        if (user === null) {
            return {
                status: false,
                message: `${this.element} no definido.`,
                user: null
            };
        }

        if (user?.password === null ||
            user?.password === undefined ||
            user?.password === '') {
            return {
                status: false,
                message: 'La contraseña es obligatoria.',
                user: null
            };
        }

        // Check that the user does not exist
        const userCheck = await findOneElement(this.getDb(), this.collection, { email: user?.email });
        if (userCheck !== null) {
            return {
                status: false,
                message: `El email ${user?.email} ya esta registrado.`,
                user: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(user!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                user: null
            };
        }
        user.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        user!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });
        // Assign the date in ISO format in the lastSession property
        user!.lastSession = '';

        // Encrypt password
        user!.password = bcrypt.hashSync(user!.password || '', 10);

        const result = await this.add(this.collection, user || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            user: result.item
        };
    }

    // Update user
    async modify() {
        const id = this.getVariables().id;
        const user = this.getVariables().user;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                user: null
            };
        }

        // Validate an existing element
        if (user === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                user: null
            };
        }

        // DETAILS
        const modificationDetails = await modifierDetails(user!.details);
        if (!modificationDetails.status) {
            return {
                status: false,
                message: modificationDetails.message,
                user: null
            };
        }
        user!.details = modificationDetails.item;
        // DETAILS

        user!.password = bcrypt.hashSync(user!.password || '', 10);

        const result = await this.update(this.collection, { id }, user || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            user: result.item
        };
    }

    // Delete user
    async delete() {
        const id = this.getVariables().id;

        // Validate ID
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`
            };
        }

        const result = await this.del(this.collection, { id }, this.element);
        return {
            status: result.status,
            message: result.message
        };
    }

    private checkData(value: string) {
        return (value === '' || value === undefined) ? false : true;
    }

}


export default UsersService;