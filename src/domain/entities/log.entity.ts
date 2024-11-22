
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions {
    level: LogSeverityLevel; // Enum
    message: string;
    createdAt?: Date;
    origin: string;
}

const dbSeverityLevel = {
    LOW: LogSeverityLevel.low,
    MEDIUM: LogSeverityLevel.medium,
    HIGH: LogSeverityLevel.high,
}

export class LogEntity {

    public level: LogSeverityLevel; // Enum
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const {message, level, createdAt = new Date(), origin} = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson (json:string): LogEntity {
        json = (json === '')? '{}' : json;
        
        const {message, level, createdAt, origin} = JSON.parse(json);
        
        const log = new LogEntity({
            message,
            level,
            createdAt: new Date(createdAt),
            origin,
        });

        return log;

    }

    static fromObject = (object: {[key: string]: any} ): LogEntity => {
        const {message, level, createdAt, origin} = object;

        const log = new LogEntity({
            message,
            level: LogSeverityLevel[level as keyof typeof LogSeverityLevel],
            createdAt: new Date(createdAt),
            origin,
        });

        return log;
    }

    static fromObjectPostgres = (object: {[key: string]: any} ): LogEntity => {
        const {message, level , createdAt, origin} = object;

        const log = new LogEntity({
            message,
            level: LogSeverityLevel[level.toLowerCase() as keyof typeof LogSeverityLevel],
            createdAt: new Date(createdAt),
            origin,
        });

        return log;
    }


}