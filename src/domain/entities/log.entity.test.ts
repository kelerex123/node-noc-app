import { LogEntity, LogSeverityLevel } from "./log.entity"

describe("log.entity.ts", () => {
    const logData = {
        message: 'Test message',
        level: LogSeverityLevel.high,
        origin: 'log.entity.test.ts'
    }

    test("should create a LogEntity instance", () => {


        const log = new LogEntity(logData)

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(logData.message);
        expect(log.level).toBe(logData.level);
        expect(log.origin).toBe(logData.origin);
        expect(log.createdAt).toBeInstanceOf(Date);

    });

    test("should create a LogEntity instance from JSON", () => {

        const logJSON = '{"message":"Service http://google.com working","level":"low","createdAt":"2024-11-20T00:02:45.305Z","origin":"check-service.ts"}';

        const log = LogEntity.fromJson(logJSON);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("Service http://google.com working");
        expect(log.level).toBe("low");
        expect(log.origin).toBe("check-service.ts");
        expect(log.createdAt).toBeInstanceOf(Date);
    

    });

    test("should create a LogEntity instance from Object", () => {

        const log = LogEntity.fromObject({
            ...logData,
            createdAt: "2024-11-20T00:02:45.305Z"
        });

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(logData.message);
        expect(log.level).toBe(logData.level);
        expect(log.origin).toBe(logData.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    

    });

    test("should create a LogEntity instance from ObjectPostgres", () => {

        const log = LogEntity.fromObjectPostgres({
            message: logData.message,
            level: 'HIGH',
            origin: logData.origin,
            createdAt: "2024-11-20T00:02:45.305Z"
        });

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(logData.message);
        expect(log.level).toBe(logData.level);
        expect(log.origin).toBe(logData.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    

    });
    


})