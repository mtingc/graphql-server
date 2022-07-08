import { IDetails } from '../interfaces/details.interface';

export async function createDetails(creatorUserId: string) {
    const details: IDetails = {
        // Assign item availability
        status: true,
        // Assign the date in ISO format in the date property
        creationDate: new Date().toISOString(),
        // FIX 👇
        creatorUserId
    };

    return details;
}

export async function editDetails(creatorUserId: string, modifierUserId: string) {
    const details: IDetails = {
        // Assign item availability
        status: false,
        // Assign the date in ISO format in the date property
        creationDate: new Date().toISOString(),
        // FIX 👇
        creatorUserId,
        modifierUserId,
        lastModification: new Date().toISOString()
    };

    return details;
}