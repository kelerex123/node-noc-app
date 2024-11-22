import mongoose from "mongoose";
import { envs } from "../../../config/plugins/envs.plugin";
import { MongoDatabase } from "../init";
import { LogModel } from "./log.model";

describe("log.model.test.ts", () => {

    beforeAll(async () => {
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        });
    });

    afterAll(() => {
        // Close the connection to the database after all tests
        mongoose.connection.close();
    })

    test("should return logModel", async() => {


        const logData = {
            message: "Test message",
            level: "low",
            origin: "log.model.test.ts"
        };

        const log = await LogModel.create(logData);

        expect(log).toEqual(expect.objectContaining({
            ...logData,
            id: expect.any(String),
            createdAt: expect.any(Date),
        }))

        await LogModel.findByIdAndDelete(log.id);

    });

    test("should return the schema object", async() => {

        const schema = LogModel.schema.obj;

        expect(schema).toEqual(expect.objectContaining({
            message: { type: expect.any(Function), required: true },
            origin: { type: expect.any(Function) },
            level: {
                type: expect.any(Function),
                enum: [ 'low', 'medium', 'high' ],
                default: 'low'
            },
            createdAt: { type: expect.any(Function), default: expect.any(Date) }
        }));

    });

});