import { IDetails } from '../interfaces/details.interface';

export async function libDetails() {
    const details: IDetails = {
        // Assign item availability
        status: true,
        // Assign the date in ISO format in the date property
        creationDate: new Date().toISOString(),
        // FIX 👇
        creatorUserId: '1',
        modifierUserId: '1',
        lastModification: new Date().toISOString()
    };

    return details;
}