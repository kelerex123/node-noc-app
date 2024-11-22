import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";


describe('log.repository.impl.test.ts', () => {

    const mockLogDataSource: LogDataSource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const logRepository = new LogRepositoryImpl(mockLogDataSource);

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should saveLog function have been called with arguments', async() => {
        // Arrange
        const log = new LogEntity({
            message: 'Test log',
            level: LogSeverityLevel.low,
            origin: 'log.repository.impl.test.ts',
        });

        await logRepository.saveLog(log);

        expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(log);

    });

    test('should getLogs function have been called with arguments', async() => {

        const securityLevel = LogSeverityLevel.low;

        const logs = await logRepository.getLogs(securityLevel);

        expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(securityLevel);
    });
})