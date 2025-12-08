import { Request, Response } from 'express';
import { CreateUserService } from '../services/UserServices.ts/CreateUserService';
import { ShowUserService } from '../services/UserServices.ts/ShowUserService';
import { UpdateUserService } from '../services/UserServices.ts/UpdateUserService';
import { AppError } from '../errors/AppError';
import { DeleteUserService } from '../services/UserServices.ts/DeleteUserService';

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, cpf, password, profile } = req.body;

  const user = await CreateUserService({ name, email, cpf, password, profile });

  return res.status(201).json(user);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.id;
  const user = await ShowUserService(id);

  return res.status(200).json(user);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = req.params.id;
  const userData = req.body;
  const userProfile = req.user.profile;

  if (userProfile < 50) {
    throw new AppError('Você não tem permissão para atualizar usuários', 403);
  }

  const updatedUser = await UpdateUserService({
    userId,
    userData,
  });

  return res.status(200).json(updatedUser);
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;

  await DeleteUserService(id);

  return res.status(204).send();
};
