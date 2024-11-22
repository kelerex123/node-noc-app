import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient } from "@prisma/client";
import { PostgresLogDatasource } from "./postgres-log.datasource";

describe("mongo-log.datasource.test.ts", () => {

    const prisma = new PrismaClient();

    beforeAll(async () => {

    });

    afterEach(async() => {
        
    });

    afterAll(async() => {
        
    });

    const postgreLogDatasource = new PostgresLogDatasource();

    const log = new LogEntity({
        message: 'test message',
        origin: 'mongo-log.datasource.test.ts',
        level: LogSeverityLevel.medium,
    });

    test("should save log", async() => {
       
    });

    test("should get logs", async() => {

        // await mongoLogDatasource.saveLog(log);
        // await mongoLogDatasource.saveLog(log);

        // const logs = await mongoLogDatasource.getLogs(LogSeverityLevel.medium);
        // expect(logs.length).toBe(2);
        // expect(logs[0].level).toBe(LogSeverityLevel.medium);

    });

})