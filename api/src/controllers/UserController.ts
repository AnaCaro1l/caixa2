import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

export const store = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, cpf, password, profile } = req.body;

    const user = await CreateUserService({ name, email, cpf, password, profile });

    return res.status(201).json(user);
}