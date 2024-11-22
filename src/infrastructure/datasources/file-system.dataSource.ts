import fs from "fs";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDataSource extends LogDataSource{

    private readonly logPath = "logs/";
    private readonly allLogsPath = "logs/logs-all.log";
    private readonly mediumLogsPath = "logs/logs-medium.log";
    private readonly hightLogsPath = "logs/logs-hight.log";

    constructor(){
        super();
        this.createLogFiles();
    }

    private createLogFiles(){
        if(!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath);
        } 

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.hightLogsPath
        ].forEach( path => {
            if(fs.existsSync(path)) return;
            fs.writeFileSync(path, "");
        })
    }

    private getLogsFromFile(path: string): LogEntity[] {

        const content = fs.readFileSync(path, "utf8");
        if(content === '') return [];
        //const logs: LogEntity[] = content.split("\n").map( log => LogEntity.fromJson(log));        
        const logs: LogEntity[] = content.split("\n").filter(log => log !== '').map(LogEntity.fromJson);
        return logs;

    }

    async saveLog(newLog: LogEntity): Promise<void> {
        
        const logAsJson = `${JSON.stringify(newLog)}\n`;

        fs.appendFileSync(this.allLogsPath, logAsJson)

        if(newLog.level === LogSeverityLevel.low) return;

        if(newLog.level === LogSeverityLevel.medium){
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        } else {
            fs.appendFileSync(this.hightLogsPath, logAsJson);
        }

    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        switch(severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.hightLogsPath);
            default:
                throw new Error(`Invalid severity level: ${severityLevel}`)
        }


    }



}
