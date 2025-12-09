import { AppError } from '../../errors/AppError';
import { User, UserProfile } from '../../models/User';
import bcrypt from 'bcrypt';

interface UserData {
  name?: string;
  email?: string;
  companyId?: number;
  password?: string;
  profile?: number;
}

interface Request {
  userId: number | string;
  userData: UserData;
}

export const UpdateUserService = async ({
  userId,
  userData,
}: Request): Promise<User> => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new AppError('Usuário não encontrado');
  }

  let { name, email, companyId, password, profile } = userData;

  const userExists = await User.findOne({
    where: { email: email },
  });

  if (userExists) {
    throw new AppError('Este email já está em uso');
  }

  if (password) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    password = passwordHash;
  }

  if (profile && user.profile < UserProfile.SUPERVISOR) {
    throw new AppError(
      'Você não tem permissão para alterar o perfil do usuário'
    );
  }

  const updatedUser = await user.update({
    ...userData,
  });

  return updatedUser;
};
