import { Request, Response } from 'express';
import { CreatePaymentService } from '../services/PaymentServices/CreatePaymentService';
import { ListPaymentsService } from '../services/PaymentServices/ListPaymentsServices';
import { ShowPaymentService } from '../services/PaymentServices/ShowPaymentService';
import { DeletePaymentService } from '../services/PaymentServices/DeletePaymentService';

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { value, dueDate } = req.body;
  const companyId = req.user.companyId;

  const payment = await CreatePaymentService({ value, dueDate, companyId });

  return res.status(201).json(payment);
};

export const list = async (req: Request, res: Response): Promise<Response> => {
  const companyId = req.user.companyId;

  const payments = await ListPaymentsService({ companyId });

  return res.status(200).json(payments);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.id;

  const payment = await ShowPaymentService(id);

  return res.status(200).json(payment);
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;
  const userProfile = req.user.profile;
  
  await DeletePaymentService(id);

  return res.status(204).send();
}
