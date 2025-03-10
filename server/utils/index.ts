import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export function generatePassword(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    const buffer = crypto.randomBytes(8);
    let password = '';

    for (let i = 0; i < 8; i++) {
        password += caracteres[buffer[i] % caracteres.length];
    }
    return password;
}

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

export async function comparePassword(password: string, userPassword: string): Promise<string> {
    const valid = await bcrypt.compare(password, userPassword);
    return valid;
}

export function formatWompi(transaction: any) {
    const {
        id,
        reference,
        payment_method_type,
        amount_in_cents,
        created_at,
        finalized_at,
        status,
        status_message,
    } = transaction;

    const estado ={
        PENDING: 'PENDIENTE',
        APPROVED: 'APROBADO',
        DECLINED: 'DECLINADO',
        ERROR: 'ERROR',
    }

    const wompi = {
        id,
        reference,
        payment_method_type,
        amount_in_cents,
        created_at,
        finalized_at,
        status: estado[status as keyof typeof estado] || 'NUEVA',
        status_message,
    }

    return { wompi, reference, status }
}
