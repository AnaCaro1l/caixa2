import { Payment } from '../../models/Payment';

interface Request {
  value: number;
  dueDate: Date;
  companyId: number;
}

export const CreatePaymentService = async ({
  value,
  dueDate,
  companyId,
}: Request): Promise<Payment> => {
  const payment = await Payment.create({
    value,
    dueDate,
    status: 'pendente',
    companyId,
  });
  return payment;
};
