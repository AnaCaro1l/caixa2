import { Request, Response } from 'express';
import { CreateDepartmentService } from '../services/DepartmentServices/CreateDepartmentService';

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
