import { CookieOptions } from 'express'

export class ServiceError extends Error {
    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
    }

    statusCode
}

export const genRefTokenObj = (maxAge: number): CookieOptions => {
    return {
        maxAge: maxAge,
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
    }
}
