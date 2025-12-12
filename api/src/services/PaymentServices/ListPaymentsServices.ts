import { AppError } from '../../errors/AppError';
import { Payment } from '../../models/Payment';
import { Op, WhereOptions } from 'sequelize';

interface Request {
  companyId: number;
  rangeDate?: [string, string];
  userId?: number;
}

export const ListPaymentsService = async ({
  companyId,
  rangeDate,
  userId,
}: Request) => {
  let whereOptions: WhereOptions<Payment> = { companyId };

  if (rangeDate && rangeDate.length === 2) {
    whereOptions = {
      ...whereOptions,
      createdAt: {
        [Op.between]: rangeDate,
      },
    };
  }

  const payments = await Payment.findAll({ where: { ...whereOptions } });

  if (!payments) {
    throw new AppError('Nenhum pagamento encontrado para esta empresa');
  }

  return payments;
};
