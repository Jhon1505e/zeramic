import { Resend } from "resend";
const config = useRuntimeConfig();
const RESEND_API_KEY = config.resendAPIKey;

// Plantillas de email - Tipos de correo
const TIPOS_DE_CORREO = {
    SIGNUP: 'BIENVENIDO',
    RESET: 'CAMBIO DE CONTRASEÑA',
    ALERT: 'ALERTA DE PAGO',
    CONFIRM: 'CONFIRMACION DE COMPRA',
    CONTACT: 'CONTACTO',
}

type Tipo = keyof typeof TIPOS_DE_CORREO;
type Info = {
    email: string;
    [key: string]: any;
};
type EmailInfo = {
    type: Tipo;
    info: Info;
}

const header = `
    <div style="width: 520px; margin: auto; border-radius: 20px; border: 1px solid #ccc;
        font-size: 1rem; font-family: Arial, Helvetica, sans-serif;">
        <div style="background: radial-gradient(circle, #5200f8 60%, #4b00e2 100%);
            padding: 20px; border-top-left-radius: 10px; border-top-right-radius: 10px;">
            <a href="https://www.zeramic.co" target="_blank">
                <img src="https://www.zeramic.co/img/logo-zeramic.png" alt="Zeramic"
                    style="width: 220px; margin: auto; display: block" />
            </a>
        </div>
        <div style="background-color: #ffff;">`;

const footer = `
        </div>
        <div style="background: radial-gradient( circle, #5200f8 60%, #4b00e2 100%);
            border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;
            padding: 10px;">
            <p style="text-align: end; font-size: 0.9rem; padding: 4px">
                <a href="https://zeramic.co" target="_blank"
                    style="font-weight: 600; color: #ffff; text-decoration: underline">zeramic.co
                </a>
            </p>
        </div>
    </div>`;

export default function useEmail() {
    const { emails } = new Resend(RESEND_API_KEY);

    const sendEmail = async ({ type, info }: EmailInfo) => {
        try {
            const data = await emails.send({
                from: "No reply - Zeramic Co <admin@zeramic.co>",
                to: info.email,
                // bcc: ['roman.david@gmail.com', 'zeramicguatape@gmail.com'],
                subject: TIPOS_DE_CORREO[type],
                html: formatEmail({ type, info }),
            })
            return data
        } catch (error) {
            console.error(error)
        }
    }

    /* 
    const formatEmail = (compra: any) => {
        const {
            reference,
            fullName,
            email,
            date,
            address,
            locationName,
            deliveryCompanyName,
            departmentOrStateName,
            shippingCost,
            wompi,
            total,
            cash,
            productos
        } = compra

        let items = '';
        for (let i = 0; i < productos?.length; i++) {
            const element = productos[i];
            items += `
                <tr>
                    <td><img style="border-radius: 5px;" src="${element.imagen}" width="120" alt="${element.producto}"></td>
                    <td>${element.producto}</td>
                    <td>${element.cantidad}</td>
                    <td>${element.valor}</td>
                </tr>`
        }

        const info = `
            <p>Fecha: ${date}</p>
            <p>Referencia: ${reference}</p>
            <p>Nombre: ${fullName}</p>
            <p>Email: ${email}</p>
            <p>Estado: ${wompi?.status || 'NUEVA'}</p>
            <p>Metodo de pago: ${wompi?.payment_method_type || 'N/A'}</p>
            <p>Direccion: ${locationName}, ${departmentOrStateName} - ${address}</p>
            <p>Envio: ${deliveryCompanyName}</p>
        `
        const alert = `
            <p>Alerta!</p>
            <p>El envio de esta compra se encuentra pendiente</p>
            <p>Saldo disponible: ${cash}</p>
            <p>Valor envio: ${shippingCost}</p>
            ${info}
            <p>Debe anadir dinero a su cuenta para crear el envio y finalizar la compra</p>
        `
        const html = `
            <h1>Informacion de la compra</h1>
            ${info}
            <p>Productos:</p>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #ccc;">
                <tr>
                    <td colspan="2">Producto</td>
                    <td>Valor</td>
                    <td>Total</td>
                </tr>
                ${items}
            </table>
            <p>Subtotal: ${total}</p>
            <p>Envio: ${shippingCost}</p>
            <p>Total: ${total + shippingCost}</p>
        `
        return (typeof cash === 'number') ? alert : html
    }

 */
    return { sendEmail }
}

const formatEmail = ({ type, info }: EmailInfo) => {
    const { fullName, password, email, message, subject } = info

    /* Plantillas HTML */
    const TEMPLATES = {
        SIGNUP: `
        <div style="padding: 20px; text-align: center;">
            <h1 style="font-weight: 600; color: #000;"> ¡Bienvenido a Zeramic!</h1>
            <p>Hola, <strong>${fullName}</strong></p>
            <p>A partir de ahora, podrás disfrutar de nuestros servicios.</p>
            <p>Para empezar, te recomendamos visitar nuestra tienda y completar tu información personal.</p>
            <p>Tu contraseña provisional es: </p>
            <p><strong>${password}</strong></p>
            <p>Por favor, cambia tu contraseña en tu primer inicio de sesión</p>
            <p style="padding-top: 10px;">
                <a style="padding: 8px 30px; background-color: #590bf9; color: #ffffff; border-radius: 5px; text-decoration: none; font-weight: 500;" href="https://www.zeramic.co/micuenta" target="_blank">Ir al Sitio</a>
            </p>
        </div>`,

        RESET: ``,

        ALERT: ``,

        CONFIRM: ``,

        CONTACT: `
            <h2 style="font-weight: 600; text-align: center;">Mensaje de Contacto</h2>
            <p style="margin-block: 5px; text-align: center;">
                Hemos recibido tu mensaje y nuestro equipo se pondrá en contacto contigo lo antes posible.
            </p>
            <div style="padding: 10px 20px;">
                <p><strong>Enviado por:</strong> ${email}</p>
                <p><strong>Asunto:</strong> ${subject}</p>
                <p><strong>Mensaje:</strong> ${message}</p>
            </div>`,
    }

    return header + TEMPLATES[type] + footer
}