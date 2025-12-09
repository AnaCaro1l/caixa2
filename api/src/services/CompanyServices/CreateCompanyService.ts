import { AppError } from '../../errors/AppError';
import { Company } from '../../models/Company';
import { User, UserProfile } from '../../models/User';

interface Request {
  name: string;
  adminId: number;
}

export const CreateCompanyService = async ({
  name,
  adminId,
}: Request): Promise<Company> => {
  const user = await User.findByPk(adminId);

  if (user.profile !== UserProfile.ADMIN) {
    throw new AppError('Somente administradores podem criar empresas');
  }

  const company = await Company.create({
    name,
    adminId,
  });

  return company;
};
