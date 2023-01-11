import { Db, MongoClient } from 'mongodb';

class Database {
    db?: Db;

    async init(): Promise<Db | undefined> {
        console.log('================DATABASE================');
        try {
            const MONGO_DB = process.env.DATABASE || 'mongodb://localhost:27017/lagalmInd';
            const client = await MongoClient.connect(MONGO_DB);

            this.db = client.db();
            // Connection status
            console.log('ONLINE');
            console.log(this.db.databaseName);
        } catch (error) {
            console.log('ERROR');
            console.log('OFFLINE');
            console.log('DATABASE:', this.db?.databaseName);
        }
        return this.db;
    }
}

export default Database;