import { AppError } from "../../errors/AppError";
import { Department } from "../../models/Department";
import { User, UserProfile } from "../../models/User";

interface Request {
    name: string;
    supervisorId: number;
    companyId: number;
}

export const CreateDepartmentService = async ({ name, supervisorId, companyId }: Request): Promise<Department> => {
    const user = await User.findByPk(supervisorId);

    if (user.profile < UserProfile.SUPERVISOR) {
        throw new AppError('Somente supervisores podem ser atribuídos como supervisores de departamento');
    }

    const department = await Department.create({
        name,
        supervisorId,
        companyId
    });

    return department;
}