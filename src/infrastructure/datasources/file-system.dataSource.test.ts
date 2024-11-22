import fs from 'fs';
import path from 'path';
import { FileSystemDataSource } from './file-system.dataSource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
describe('file-system.dataSource.test.ts', () => {

    const logPath = path.join(__dirname, '../../../logs');

    beforeEach(() => {
        fs.rmSync(logPath, {recursive: true, force: true});
    });
    const testFile =  new FileSystemDataSource();

    test('should create log files if they not exist', () => {
       
        new FileSystemDataSource();

        const files = fs.readdirSync(logPath);

        expect(files).toEqual(["logs-all.log", "logs-hight.log","logs-medium.log"]);


    });

    test('should save a log in logs-all.log', async() => {
     
        const fileLogDataSource = new FileSystemDataSource();

        const log = new LogEntity({
            message: 'Test log',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts',
        });
        await fileLogDataSource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));



    });

    test('should save a log in logs-all.log and logs-medium.log', async() => {

        const fileLogDataSource = new FileSystemDataSource();

        const log = new LogEntity({
            message: 'Test log',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts',
        });
        await fileLogDataSource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));


    });

    test('should save a log in logs-all.log and logs-hight.log', async() => {
        const fileLogDataSource = new FileSystemDataSource();

        const log = new LogEntity({
            message: 'Test log',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts',
        });
        await fileLogDataSource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-hight.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));
        expect(highLogs).toContain(JSON.stringify(log));

    });

    test('should return all logs', async() => {
    
        const fileLogDataSource = new FileSystemDataSource();

        const logLow = new LogEntity({
            message: 'log low',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts',
        });

        const logMedium = new LogEntity({
            message: 'log low',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts',
        });

        const logHigh = new LogEntity({
            message: 'log low',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts',
        });

        await fileLogDataSource.saveLog(logLow);
        await fileLogDataSource.saveLog(logMedium);
        await fileLogDataSource.saveLog(logHigh);

        const logsLow = await fileLogDataSource.getLogs(LogSeverityLevel.low);
        const logsMedium = await fileLogDataSource.getLogs(LogSeverityLevel.medium);
        const logsHigh = await fileLogDataSource.getLogs(LogSeverityLevel.high);


        expect(logsLow.length).toBe(3);
        expect(logsMedium[0].level).toBe("medium");
        expect(logsHigh[0].level).toBe("high");
    

    });

    test('should not create files if already exists', async() => {
        new FileSystemDataSource();
        console.log("XD 1")
        new FileSystemDataSource();
        
        expect(true).toBeTruthy();
 

    });

    test('should throw an error if severity level is not defined', async() => {
        const fileLogDataSource = new FileSystemDataSource();
        //console.log("xd");

        const customSecurityLevel =  'SUPER' as LogSeverityLevel;

        try {
            await fileLogDataSource.getLogs(customSecurityLevel);
            expect(true).toBeFalsy();
        } catch (error:any) {
            expect(error instanceof Error).toBe(true);
            expect(error.message).toBe(`Invalid severity level: ${customSecurityLevel}`);
        }


    });

})