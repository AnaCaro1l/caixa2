import { Company } from '../../models/Company';

interface Request {
  name: string;
  adminId: number;
}

export const CreateCompanyService = async ({
  name,
  adminId,
}: Request): Promise<Company> => {
  const company = await Company.create({
    name,
    adminId,
  });
  return company;
};
