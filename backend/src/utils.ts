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
        expiresIn: '1d',
    })
}