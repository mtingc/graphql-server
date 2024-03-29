import { Db } from 'mongodb';
import { IContextData } from './../interfaces/context-data.interface';
import { IVariables } from './../interfaces/variables.interface';
import {
    deleteOneElement,
    findElements,
    findOneElement,
    insertOneElement,
    updateOneElement
} from './../lib/db-operations';
import { pagination } from './../lib/pagination';

class ResolversOperationsService {

    private root: object;
    private variables: IVariables;
    private context: IContextData;

    constructor(
        root: object,
        variables: IVariables,
        context: IContextData
    ) {
        this.root = root;
        this.variables = variables;
        this.context = context;
    }

    protected getVariables(): IVariables { return this.variables; }
    protected getDb(): Db { return this.context.db!; }
    protected getContext(): IContextData { return this.context; }

    // List items
    protected async list(collection: string, listElement: string, page = 1, itemsPage = 20) {
        try {
            const paginationData = await pagination(this.getDb(), collection, page, itemsPage);

            return {
                info: {
                    page: paginationData.page,
                    pages: paginationData.pages,
                    itemsPage: paginationData.itemsPage,
                    total: paginationData.total,
                },
                status: true,
                message: `Lista de ${listElement} cargada.`,
                items: await findElements(this.getDb(), collection, {}, paginationData)
            };
        } catch (error) {
            return {
                info: null,
                status: false,
                message: `Lista de ${listElement} no cargada: ${error}`,
                items: null
            };
        }
    }

    // Get item details
    protected async get(collection: string, listElement: string) {

        try {
            return await findOneElement(this.getDb(), collection, { id: this.variables.id }).then(
                res => {
                    if (res) {
                        return {
                            status: true,
                            message: `El ${listElement} ha sido cargada correctamente con sus detalles.`,
                            item: res
                        };
                    }
                    return {
                        status: false,
                        message: `El ${listElement} no ha obtenido ningun detalle por que no existe.`,
                        item: null
                    };
                }
            );
        } catch (error) {
            return {
                status: false,
                message: `Error al cargar los detalles de ${listElement}`,
                item: null
            };
        }

    }

    // Add item
    protected async add(collection: string, document: object, item: string) {
        try {
            return await insertOneElement(this.getDb(), collection, document).then(
                res => {
                    if (res.insertedId) {
                        return {
                            status: true,
                            message: `Añadido correctamente el ${item}.`,
                            item: document
                        };
                    }
                    return {
                        status: false,
                        message: `No se ha insertado el ${item}. Intentelo de nuevo.`,
                        item: null
                    };
                }
            );
        } catch (error) {
            return {
                status: false,
                message: `Error inesperado el crear el ${item}. Intentelo de nuevo.`,
                item: null
            };
        }
    }

    // Modify element
    protected async update(collection: string, filter: object, objectUpdate: object, item: string) {
        try {
            return await updateOneElement(
                this.getDb(),
                collection,
                filter,
                objectUpdate
            ).then(
                res => {
                    if (res.modifiedCount === 1 && res.acknowledged) {
                        return {
                            status: true,
                            message: `Elemento del ${item} actualizado correctamente.`,
                            item: Object.assign({}, filter, objectUpdate)
                        };
                    }
                    return {
                        status: false,
                        message: `Elemento del ${item} no se ha actualizado correctamente.`,
                        item: null
                    };
                });
        } catch (error) {
            return {
                status: false,
                message: `Error inesperado el actualizar el ${item}. Intentelo de nuevo.`,
                item: null
            };
        }
    }

    // delete item
    protected async del(collection: string, filter: object, item: string) {
        try {
            return await deleteOneElement(this.getDb(), collection, filter)
                .then(
                    res => {
                        if (res.deletedCount === 1) {
                            return {
                                status: true,
                                message: `El elemento del ${item} se ha eliminado correctamente.`
                            };
                        }
                        return {
                            status: false,
                            message: `El elemento del ${item} no se ha borrado.`
                        };
                    }
                );
        } catch (error) {
            return {
                status: false,
                message: `Error inesperado al eliminar el ${item}.`
            };
        }
    }
}

export default ResolversOperationsService;