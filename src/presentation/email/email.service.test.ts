import { mock } from "node:test";
import { EmailService, SendEmailOptions } from "./email.service";
import nodemailer from 'nodemailer';

describe('email.service.test.ts', () => {

    const mockSendEmail = jest.fn();

    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendEmail
    });

    const emailService = new EmailService();

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should send email', async() => {

        const options: SendEmailOptions = {
            to: 'superbraw2000@gmail.com',
            subject: 'Test Email',
            htmlBody: '<h1>Test Email</h1>',
        }

        await emailService.sendEmail(options);
        
        expect(mockSendEmail).toHaveBeenCalledWith({
            attachments: expect.any(Array), 
            html: "<h1>Test Email</h1>", 
            subject: "Test Email", 
            to: "superbraw2000@gmail.com"
        });

    });

    test('should send email with attachments', async() => {

        const email = 'superbraw2000@gmail.com';

        await emailService.sendEmailWithFileSystemLogs(email);
        
        expect(mockSendEmail).toHaveBeenCalledWith({
            to: email, 
            subject: 'Logs del servidor',
            html: expect.any(String),
            attachments: expect.arrayContaining([
                {
                    filename: 'logs-all.log',
                    path: 'logs/logs-all.log',
                },
                {
                    filename: 'logs-hight.log',
                    path: 'logs/logs-hight.log',
                },
                {
                    filename: 'logs-medium.log',
                    path: 'logs/logs-medium.log',
                }
            ]),
        });

    })

});