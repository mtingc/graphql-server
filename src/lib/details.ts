import { IDetails } from '../interfaces/common/details.interface';

export async function createDetails(createDetails: IDetails) {

    if (createDetails === {} || createDetails === undefined || createDetails === null) {
        return {
            status: false,
            message: 'Detalles no definidos.',
            item: {}
        };
    }
    const { status, creatorUserId, creationDate, modifierUserId, creatorUser } = createDetails;
    if (status !== true) {
        return {
            status: false,
            message: 'El estado debe ser true.',
            item: {}
        };
    }
    if (creationDate !== undefined) {
        return {
            status: false,
            message: 'La fecha de creacion debe ir vacio.',
            item: {}
        };
    }
    if (modifierUserId !== undefined) {
        return {
            status: false,
            message: 'El usuario modificador debe ir vacio.',
            item: {}
        };
    }
    if (creatorUser !== undefined) {
        return {
            status: false,
            message: 'El campo debe ir vacio.',
            item: {}
        };
    }
    if (creatorUserId === null
        || creatorUserId === undefined
        || creatorUserId === '') {
        return {
            status: false,
            message: 'Usuario creador no definido.',
            item: {}
        };
    }

    const creationDetails: IDetails = {
        status,
        creationDate: new Date().toISOString(),
        creatorUserId,
        creatorUser: creatorUserId,
        modifierUserId: '',
        lastModification: ''
    };

    return {
        status: true,
        message: 'Detalles creados,',
        item: creationDetails
    };

}

export async function modifierDetails(createDetails: IDetails) {

    if (createDetails === {} || createDetails === undefined || createDetails === null) {
        return {
            status: false,
            message: 'Detalles no definidos.',
            item: {}
        };
    }

    const { status, creatorUserId, creationDate, modifierUserId, creatorUser } = createDetails;
    if (creatorUser !== undefined) {
        return {
            status: false,
            message: 'El campo debe ir vacio.',
            item: {}
        };
    }
    if (creatorUserId === null
        || creatorUserId === undefined
        || creatorUserId === '') {
        return {
            status: false,
            message: 'Usuario creador modificdo.',
            item: {}
        };
    }
    if (creationDate === null
        || creationDate === undefined
        || creationDate === '') {
        return {
            status: false,
            message: 'Fecha de creacion modificada.',
            item: {}
        };
    }
    if (modifierUserId === null
        || modifierUserId === undefined
        || modifierUserId === '') {
        return {
            status: false,
            message: 'Usuario modificador no definido.',
            item: {}
        };
    }


    const modificationDetails: IDetails = {
        status,
        creationDate,
        creatorUserId,
        creatorUser: creatorUserId,
        modifierUserId,
        lastModification: new Date().toISOString()
    };

    return {
        status: true,
        message: 'Detalles editados',
        item: modificationDetails
    };
}