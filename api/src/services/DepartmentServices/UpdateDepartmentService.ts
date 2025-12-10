import { AppError } from '../../errors/AppError';
import { Department } from '../../models/Department';

interface DepartmentData {
  name?: string;
  supervisorId?: number;
}

interface Request {
  id: number | string;
  departmentData: DepartmentData;
}

export const UpdateDepartmentService = async ({
  id,
  departmentData,
}: Request): Promise<Department> => {
  const department = await Department.findByPk(id);

  if (!department) {
    throw new AppError('Departamento não encontrado');
  }

  const { name, supervisorId } = departmentData;

  const updatedDepartment = await department.update({
    ...departmentData,
  });

  return updatedDepartment;
};
