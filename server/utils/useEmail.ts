import { Resend } from "resend";
const config = useRuntimeConfig();
const RESEND_API_KEY = config.resendAPIKey;

type EmailInfo = {
    email: string;
    subject: string;
    html: string;
}

export default function useEmail() {
    const { emails } = new Resend(RESEND_API_KEY);

    const sendEmail = async (info: EmailInfo) => {
        try {
            return await emails.send({
                from: "No reply - Zeramic Co <admin@zeramic.co>",
                to: info.email,
                // bcc: ['roman.david@gmail.com', 'zeramicguatape@gmail.com'],
                subject: info.subject,
                html: info.html,
            })
        } catch (e) {
            console.error(e)
            return null
        }
    }

    return { sendEmail }
}