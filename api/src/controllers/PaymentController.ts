import { Request, Response } from "express";
import { CreatePaymentService } from "../services/PaymentServices/CreatePaymentService";

export const store = async (req: Request, res: Response): Promise<Response> => {
    const { value, dueDate, companyId } = req.body;

    const payment = await CreatePaymentService({ value, dueDate, companyId });

    return res.status(201).json(payment);
}