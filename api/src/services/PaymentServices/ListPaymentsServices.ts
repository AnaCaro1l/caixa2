import { AppError } from "../../errors/AppError";
import { Payment } from "../../models/Payment";

interface Request {
    companyId: number;
}


export const ListPaymentsService = async ({ companyId }: Request) => {
    const payments = await Payment.findAll({ where: { companyId } });

    if (!payments) {
        throw new AppError('Nenhum pagamento encontrado para esta empresa');
    }

    return payments;

}