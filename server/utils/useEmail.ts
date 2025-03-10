import { Resend, ErrorResponse } from "resend";
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
type EmailInfo = {
    type: Tipo;
    email: string;
    html: string;
}

const header = `<div style="width: 520px; margin: auto; border-radius: 5px; border: 1px solid #ccc; font-family: Arial, Helvetica, sans-serif;">
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
                subject: TIPOS_DE_CORREO[info.type],
                html: header + info.html + footer,
            })
            return data
        } catch (error) {
            console.error(error)
        }
    }

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

    return { formatEmail, sendEmail }
}