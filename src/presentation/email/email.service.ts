import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

export interface Attachment {
    filename: string;
    path: string;
}

export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[]; 
}

export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: envs.MAILER_SERVICE,
            auth: {
                user: envs.MAILER_EMAIL,
                pass: envs.MAILER_SECRET_KEY,
            }
        });
    }

    async sendEmail(options: SendEmailOptions): Promise<boolean> {

        const {to, subject, htmlBody, attachments = []} = options;

        try {

            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });

            //console.log(sentInformation);

            return true;
        } catch (error) {
            // this.logRepository.saveLog(log);
            return false;
        }

    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del servidor';
        const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p>Hay logs nuevos para revisar.</p>
            <p>Ver logs adjuntos</p>
        `;

        const attachments: Attachment[] = [
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
        ];

        return this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments,
        });

    }


}