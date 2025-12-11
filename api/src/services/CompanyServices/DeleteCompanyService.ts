import { AppError } from '../../errors/AppError';
import { Company } from '../../models/Company';

export const DeleteCompanyService = async (
  id: string | number
): Promise<void> => {
  const company = await Company.findByPk(id);

  if (!company) {
    throw new AppError('Empresa não encontrada');
  }

  await company.destroy();
};
