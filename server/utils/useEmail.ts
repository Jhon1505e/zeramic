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
    const { fullName, password, email, message, subject,
        address, locationName, departmentOrStateName, productos, total,
        deliveryCompanyName, shippingCost, reference, date, wompi
    } = info

    const items = productos?.map((item: any) => {
        return `
        <div style="display: flex; padding: 10px; border-bottom: solid 1px #CCC; align-items: center; justify-content: space-between; gap: 10px;">
        <a href="https://www.zeramic.co${item.slug}" target="_blank" style="width: 180px;">
            <img src="${item.imagen}" style="width: 120px; border-radius: 10px" alt="Zeramic" />
        </a>
        <div style="width: 100%;padding: 5px">
            <div style="font-weight: 600">${item.producto}</div>
            <div style="font-size: 0.9rem">Cant: ${item.cantidad} x ${formatMoneda(item.valor)}</div>
        </div>
        <div style="font-weight: 600; text-align: right;">${formatMoneda(item.valor * item.cantidad)}</div>
        </div>
        `
    }).join('')

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

        CONFIRM: `
          <div style="padding: 4px 10px; font-size: 0.97rem; color: #696868;">
            <div style="text-align: right; font-size: 0.9rem">${date}</div>
            <h1 style="font-weight: 600; text-align: center">
              Confirmación de tu pedido
            </h1>
            <div style="padding: 0 40px 10px 40px; text-align: center;">
              Gracias por tu compra en Zeramic; aquí tienes el resumen de tu pedido:
            </div>
             <div style="display: flex; gap: 10px; justify-content: space-between;">
               <div style="width: 50%;"><strong>Nombre:</strong> ${fullName}</div>
               <div style="text-align: center;">${email}</div>
             </div>
             <div><strong>Dirección:</strong>
               ${address}. ${locationName}, ${departmentOrStateName}
             </div>
            <div style="display: flex; gap: 10px">
              <div><strong>Metodo de Pago:</strong> ${wompi?.payment_method_type}</div>
              <div style="text-align: center;"><strong>Estado:</strong> ${wompi?.status}</div>
              <div><strong>Enviado por:</strong> ${deliveryCompanyName}</div>
              <div style="text-align: center;"><strong>Valor Envio:</strong> ${formatMoneda(shippingCost)}</div>
            </div>
            <p style="font-weight: bolder; font-size: 20px; margin-top: 10px;">
              Productos:
            </p>
            ${items}
            <div style="display: flex; gap: 6px; padding: 6px;">
              <div style="width: 33%;">Subtotal: ${formatMoneda(total)}</div>
              <div style="width: 33%;"> + Envio: ${formatMoneda(shippingCost)}</div>
              <div style="font-weight: 600; font-size: 1.1rem; width: 33%;"> = Total: ${formatMoneda(total + shippingCost)}</div>
            </div>
            <p style="margin-block:10px; text-align: center;">
              ¡Esperamos que disfrutes tu compra! <br />
              Puedes seguir el estado de tu pedido aquí:
            </p>
            <div style="padding: 10px 20px; text-align: center;">
              <a style="padding: 8px 30px; background-color: #590bf9; color: #ffffff; border-radius: 5px; text-decoration: none; font-weight: 500;" href="https://www.zeramic.co/micuenta/compras" target="_blank">Seguir Pedido</a>
            </div>
            <div style="text-align: center;"><small><strong>Id compra:</strong> ${reference}</small></div>
          </div>`,

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

export function formatMoneda(value: number) {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);
  }