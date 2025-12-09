import { object, string } from 'yup';

export class UserSchemas {
    static createUser = object({
        email: string().required(),
        password: string().required(),
    })
}