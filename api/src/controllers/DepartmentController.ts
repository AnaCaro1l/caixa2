import { Request, Response } from 'express';
import { CreateDepartmentService } from '../services/DepartmentServices/CreateDepartmentService';
import { ShowDepartmentService } from '../services/DepartmentServices/ShowDepartmentService';
import { UpdateDepartmentService } from '../services/DepartmentServices/UpdateDepartmentService';
import { AppError } from '../errors/AppError';

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { name, supervisorId } = req.body;
  const companyId = req.user.companyId;

  const department = await CreateDepartmentService({
    name,
    supervisorId,
    companyId,
  });

  return res.status(201).json(department);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.id;

  const department = await ShowDepartmentService(id);

  return res.status(200).json(department);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;
  const departmentData = req.body;

  if (req.user.profile < 50) {
    throw new AppError('Você não tem permissão para atualizar departamentos', 403);
  }

  const updatedDepartment = await UpdateDepartmentService({
    id,
    departmentData,
  });

  return res.status(200).json(updatedDepartment);
};
