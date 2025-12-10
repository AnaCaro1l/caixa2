import { AppError } from '../../errors/AppError';
import { Department } from '../../models/Department';

export const ShowDepartmentService = async (
  id: number | string
): Promise<Department> => {
  const department = await Department.findByPk(id);

  if (!department) {
    throw new AppError('Departamento não encontrado');
  }

  return department;
};
