import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs";


describe('send-email-logs.test.ts', () => {

    const email = "superbraw2000@gmail.com";

    const mockRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn(),
        sendEmail: jest.fn(),

    };

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockRepository
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call sendEmail and saveLog and return true', async() => {

        mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(true);

        const wasOk = await sendEmailLogs.execute(email);

        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled();
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(wasOk).toBe(true);
        


    });

    test('should log in case of error', async() => {

        mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false);

        const wasOk = await sendEmailLogs.execute(email);

        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled();
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(wasOk).toBe(false);
        


    })

})