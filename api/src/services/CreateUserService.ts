import { AppError } from "../errors/AppError";
import { User, UserProfile } from "../models/User";
import bcrypt from 'bcrypt';

interface Request {
    name: string;
    email: string;
    cpf: string;
    password: string;
    profile?: number;
}


export const CreateUserService = async ({ name, email, cpf, password, profile }: Request): Promise<User> => {
    const userExists = await User.findOne({
        where: { email: email }
    })

    if (userExists) {
        throw new AppError('Este email já está em uso');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
        name,
        email,
        cpf,
        passwordHash,
        profile: UserProfile.VENDEDOR,
    });

    return user;
}