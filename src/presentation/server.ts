import { FileSystemDataSource } from './../infrastructure/datasources/file-system.dataSource';
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from './email/email.service';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';

const fileSystemDataSource = new FileSystemDataSource();
const mongoDataSource = new MongoLogDatasource();
const postgresDataSource = new PostgresLogDatasource();
const fsLogRepository = new LogRepositoryImpl(
    fileSystemDataSource,
);

const mongoLogRepository = new LogRepositoryImpl(
    mongoDataSource,
);

const postgreLogRepository = new LogRepositoryImpl(
    postgresDataSource
);


const emailService = new EmailService();

export class ServerApp {

    public static async start() {

        console.log("Server Starting...");  


        // Mandar email
        // new SendEmailLogs(emailService, logRepository).execute(
        //     ["bryananton0302@gmail.com", "superbraw2000@gmail.com"]
        // );

        // const emailService = new EmailService(logRepository);
        // emailService.sendEmailWithFileSystemLogs(
        //     ["bryananton0302@gmail.com", "superbraw2000@gmail.com"]
        // );

        //const logs = await logRepository.getLogs(LogSeverityLevel.high); 

        //console.log(logs);

        CronService.createJob(
            "*/5 * * * * *", 
            () => {
                const url = "http://google.com";
                new CheckServiceMultiple(
                    [fsLogRepository, mongoLogRepository, postgreLogRepository],
                    // logRepository,
                    () => console.log(`${url} is ok`),
                    (error) => console.error(error)
                ).execute(url);
        //         // new CheckService().execute("http://localhost:3000/");
                
            }
        );

    } 

}