import { AppError } from '../../errors/AppError';
import { Department } from '../../models/Department';

export const DeleteDepartmentService = async (
  id: string | number
): Promise<void> => {
  const department = await Department.findByPk(id);

  if (!department) {
    throw new AppError('Departamento não encontrado');
  }

  await department.destroy();
};
