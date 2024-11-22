import mongoose from "mongoose";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { envs } from "../../config/plugins/envs.plugin";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe("mongo-log.datasource.test.ts", () => {
    
    beforeAll(async () => {
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        });
    });

    afterEach(async() => {
        await LogModel.deleteMany();
    });

    afterAll(async() => {
        mongoose.connection.close();
    });

    const mongoLogDatasource = new MongoLogDatasource();

    const log = new LogEntity({
        message: 'test message',
        origin: 'mongo-log.datasource.test.ts',
        level: LogSeverityLevel.medium,
    });

    test("should save log", async() => {
       
        const logSpy = jest.spyOn(console, "log");

        await mongoLogDatasource.saveLog(log);
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith(expect.any(String));

    });

    test("should get logs", async() => {

        await mongoLogDatasource.saveLog(log);
        await mongoLogDatasource.saveLog(log);

        const logs = await mongoLogDatasource.getLogs(LogSeverityLevel.medium);
        expect(logs.length).toBe(2);
        expect(logs[0].level).toBe(LogSeverityLevel.medium);

    });

})