import { AppError } from '../../errors/AppError';
import { Company } from '../../models/Company';
import { Department } from '../../models/Department';

export const ShowCompanyService = async (
  id: number | string
): Promise<Company> => {
  const company = await Company.findOne({
    where: { id: id },
    include: [
      {
        model: Department,
        as: 'departments',
      },
    ],
  });

  if (!company) {
    throw new AppError('Empresa não encontrada');
  }

  return company;
};
