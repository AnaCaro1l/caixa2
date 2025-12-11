import { AppError } from '../../errors/AppError';
import { Payment } from '../../models/Payment';

export const DeletePaymentService = async (
  id: string | number
): Promise<void> => {
  const payment = await Payment.findByPk(id);

  if (!payment) {
    throw new AppError('Payment not found');
  }

  await payment.destroy();
};
