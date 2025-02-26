import { Resend } from "resend";
const config = useRuntimeConfig();
const RESEND_API_KEY = config.resendAPIKey;

type EmailInfo = {
    email: string;
    subject: string;
    html: string;
}

const header = `<div style="width: 400px; margin: auto; border-radius: 5px; border: 1px solid #ccc; font-family: Arial, Helvetica, sans-serif;">
                <div style="background-color: #5200f8; padding: 20px; border-radius: 5px 5px 0 0;">
                    <a href="https://www.zeramic.co" target="_blank">
                        <img src="https://www.zeramic.co/img/logo-zeramic.png" alt="Zeramic"
                            style="width: 220px; margin: auto; display: block;">
                    </a>
                </div>
                <div style="padding: 8px;font-size: 0.9rem;">
                <p>`;
const footer = `</p>
                <hr>
                    <p style="text-align: center; font-size: 0.9rem; padding: 4px;">
                        Visita nuestra tienda en:
                        <a href="https://zeramic.co" target="_blank"
                            style="font-weight: 500; text-decoration: underline;">
                            zeramic.co
                        </a>
                    </p>
                </div>
            </div>`;

export default function useEmail() {
    const { emails } = new Resend(RESEND_API_KEY);

    const sendEmail = async (info: EmailInfo) => {
        try {
            const data = await emails.send({
                from: "No reply - Zeramic Co <admin@zeramic.co>",
                to: info.email,
                // bcc: ['roman.david@gmail.com', 'zeramicguatape@gmail.com'],
                subject: info.subject,
                html: header + info.html + footer,
            })
            return data
        } catch (error) {
            console.error(error)
            return error
        }
    }

    return { sendEmail }
}