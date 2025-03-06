import jwt from "jsonwebtoken"
import { ObjectId } from "mongodb"
const config = useRuntimeConfig()

interface User {
    id: ObjectId,
    email: string
}

const createToken = async (user: User) => {
    return await jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        'config.tokenSecret',
        {
            expiresIn: "1h"
        }
    )
}

const verifyToken = async (token: string) => {
    try {
        return await jwt.verify(token, 'config.tokenSecret')
    } catch (err) {
        return null
    }
}

const getUserToken = async (event: any) => {
    const cookie = getCookie(event, "__session")
    if (!cookie) {
        return null
    }
    const token = verifyToken(cookie)
    if (!token) {
        return null
    }
    return token
}

export { createToken, verifyToken, getUserToken }