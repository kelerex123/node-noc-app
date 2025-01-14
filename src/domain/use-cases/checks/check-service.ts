import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    // execute(url: string): Promise<boolean> 
    execute: (url: string) => Promise<boolean>
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {

    constructor(
        // private dependencies: Dependencies // add any dependencies you may need here
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ) {
        // initialize any necessary dependencies or configurations here
    }

    public async execute(url: string): Promise<boolean> {
        
        try {

            const req = await fetch(url);
            if(!req.ok) {
                throw new Error(`Error on check service: ${url}`);
            }

            const log = new LogEntity({
                message: `Service ${url} working`,
                level: LogSeverityLevel.low,
                origin: "check-service.ts",
            });
            this.logRepository.saveLog(log);
            this.successCallback && this.successCallback(); // call the success callback if the request is successful

            return true;

        } catch (error: any) {
            const log = new LogEntity({
                message: `${url} is not ok. ${error.message}`,
                level: LogSeverityLevel.high,
                origin: "check-service.ts",
            });
            this.logRepository.saveLog(log);
            this.errorCallback && this.errorCallback(error.message);

            return false;
        }

    }

}