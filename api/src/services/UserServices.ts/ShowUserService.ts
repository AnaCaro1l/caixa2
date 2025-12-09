import { AppError } from '../../errors/AppError';
import { Company } from '../../models/Company';
import { Department } from '../../models/Department';
import { User } from '../../models/User';

export const ShowUserService = async (id: number | string): Promise<User> => {
  const user = await User.findOne({
    where: { id: id },
    include: [
      {
        model: Company,
        as: 'company',
      },
      {
        model: Department,
        as: 'departments',
      },
    ],
  });

  if (!user) {
    throw new AppError('Usuário não encontrado');
  }

  return user;
};
