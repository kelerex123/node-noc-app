
interface CheckServiceUseCase {
    // execute(url: string): Promise<boolean> 
    execute: (url: string) => Promise<boolean>
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        // private dependencies: Dependencies // add any dependencies you may need here
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

            this.successCallback(); // call the success callback if the request is successful

            return true;

        } catch (error) {
            if(error instanceof Error) {     
                this.errorCallback(error.message)
            }

            return false;
        }

    }

}