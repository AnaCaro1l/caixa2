import { AppError } from '../../errors/AppError';
import { Payment } from '../../models/Payment';

export const ShowPaymentService = async (
  id: number | string
): Promise<Payment> => {
  const payment = await Payment.findByPk(id);

  if (!payment) {
    throw new AppError('Pagamento não encontrado');
  }

  return payment;
};
