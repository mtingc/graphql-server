import { Db, SortDirection } from 'mongodb';

/**
 * Get the new ID for the new item.
 * @param database Database in use.
 * @param collection Collection where the search for the last element is done.
 * @param sort How the item will be sorted.
 * @returns Assign an ID.
 */
export const assignDocumentId = async (
    database: Db,
    collection: string,
    sort: { key: string, order: SortDirection } = {key: 'registerDate', order: 1}
) => {
    const lastElement = await database
        .collection(collection)
        .find()
        .sort(sort.key, sort.order as SortDirection)
        .limit(1)
        .toArray();

    if(lastElement.length === 0) {
        return '1';
    }
    return String(+lastElement[0].id + 1);

};

/**
 * Filter item search.
 * @param database Database with which you work.
 * @param collection Collection to filter the item.
 * @param filter Filters object.
 * @returns Filtered element.
 */
export const findOneElement = async (
    database: Db,
    collection: string,
    filter: object
) => {
    return database
        .collection(collection)
        .findOne(filter);
};

/**
 * Insert an element.
 * @param database Database with which you work.
 * @param collection Collection to filter the item.
 * @param document Document.
 */
export const insertOneElement = async (
    database: Db,
    collection: string,
    document: object
) => {
    return await database
        .collection(collection)
        .insertOne(document);
};

/**
 * Insert multiple elements.
 * @param database Database with which you work.
 * @param collection Collection to filter the item.
 * @param documents Documents.
 */
export const insertManyElement = async (
    database: Db,
    collection: string,
    documents: Array<object>
) => {
    return await database
        .collection(collection)
        .insertMany(documents);
};

/**
 * Update an element.
 * @param database Database with which you work.
 * @param collection Collection to filter the item.
 * @param filter Search filter.
 * @param updateObject Updated object.
 */
export const updateOneElement = async (
    database: Db,
    collection: string,
    filter: object,
    updateObject: object
) => {
    return await database
        .collection(collection)
        .updateOne(
            filter,
            { $set: updateObject }
        );
};

/**
 * Delete an element.
 * @param database Database with which you work.
 * @param collection Collection to filter the item.
 * @param filter Search filter.
 */
export const deleteOneElement = async (
    database: Db,
    collection: string,
    filter: object
) => {
    return await database
        .collection(collection)
        .deleteOne(filter);
};

/**
 * Search for multiple items with filter.
 * @param database Database with which you work.
 * @param collection Collection where the search for elements is performed.
 * @param filter Filters object.
 */
export const findElements = async (
    database: Db,
    collection: string,
    filter: object = {}
) => {
    return await database.collection(collection).find(filter).toArray();
};