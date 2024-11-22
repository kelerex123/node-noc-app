import mongoose from "mongoose";
import { MongoDatabase } from "./init";

describe('init MongoDB', () => {

    afterAll(() => {
        mongoose.connection.close();
    })

    test('should connect to MongoDB', async() => {
        
        const connected = await MongoDatabase.connect({
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGODB_DB_NAME!
        });

        expect(connected).toBe(true);
        
    })

    test('should throw an error', async() => {
        
        try {
            const connected = await MongoDatabase.connect({
                mongoUrl: 'mongodb://bryan:123456789@localasdadhost:27017/',
                dbName: process.env.MONGODB_DB_NAME!
            });
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            
        }

        

        
    })

});