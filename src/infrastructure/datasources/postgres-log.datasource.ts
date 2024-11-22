import { PrismaClient, SeverityLevel} from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

const securityLevelEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostgresLogDatasource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
        
        const {message, level, origin, createdAt} = log;

        await prisma.logModel.create({
            data: {
                ...log,
                level: securityLevelEnum[level],
            }
        });

        
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await prisma.logModel.findMany({
            where: {
                level: securityLevelEnum[severityLevel],
            }
        });

        return logs.map(LogEntity.fromObjectPostgres);

    }

}