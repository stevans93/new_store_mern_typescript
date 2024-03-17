import { NextFunction, Request, Response } from "express";
import { User } from "./models/user";
import jwt from 'jsonwebtoken'

export const generateToken = (user: User) => {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'secret',
    {
        expiresIn: '1h',
    })
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if(authorization) {
        const token = authorization.slice(7, authorization.length)

        const decode = jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret')

        req.user = decode as {
            _id: string;
            email: string;
            name: string;
            isAdmin: boolean;
            token: string;
        }
        next()
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}