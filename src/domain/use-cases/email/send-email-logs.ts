import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

export interface SendEmailLogsUseCase {

    execute: (to: string | string[]) => Promise<boolean>;

}

export class SendEmailLogs implements SendEmailLogsUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ){}

    execute =  async (to: string | string[]) => {

        try {
            
            const send = await this.emailService.sendEmailWithFileSystemLogs(to);

            if (!send) throw new Error('Email log not sent');

            const log = new LogEntity({
                message: 'Log email sent',
                level: LogSeverityLevel.low,
                origin: "send-email-logs.ts",
            });
            await this.logRepository.saveLog(log);

            return true;

        } catch (error: any) {
            
            const log = new LogEntity({
                message: error.message,
                level: LogSeverityLevel.high,
                origin: "send-email-logs.ts",
            });
            await this.logRepository.saveLog(log);
                
           
            return false;
        }
    }; 

}