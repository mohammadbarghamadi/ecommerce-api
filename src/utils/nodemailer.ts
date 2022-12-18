import nodemailer from "nodemailer"

export interface NodeMailerOptionsInt {
    to: string
    subject: string
    html: string
}

export type SendEmailInt = (options: NodeMailerOptionsInt) => Promise<string> 

export const sendEmail:SendEmailInt = async (options: NodeMailerOptionsInt) => {

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERV,
        port: 587,
        secure: false, // true for 465, false for other ports
        tls: {rejectUnauthorized: false},
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });

    const { to, subject, html } = options
    const info = await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });

    return `Message sent: %s ${info.messageId}`;
}

export default sendEmail