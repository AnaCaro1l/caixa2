import { Department } from "../../models/Department";

interface Request {
    name: string;
    supervisorId: number;
    companyId: number;
}

export const CreateDepartmentService = async ({ name, supervisorId, companyId }: Request): Promise<Department> => {

    const department = await Department.create({
        name,
        supervisorId,
        companyId
    });

    return department;
}