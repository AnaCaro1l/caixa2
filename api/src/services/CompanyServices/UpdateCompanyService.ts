import { AppError } from '../../errors/AppError';
import { Company } from '../../models/Company';

interface CompanyData {
  name?: string;
  adminId?: number;
}

interface Request {
  id: number | string;
  companyData: CompanyData;
}

export const UpdateCompanyService = async ({
  id,
  companyData,
}: Request): Promise<Company> => {
  const company = await Company.findByPk(id);

  if (!company) {
    throw new AppError('Empresa não encontrada');
  }

  let { name, adminId } = companyData;

  const updatedCompany = await company.update({
    ...companyData,
  });

  return updatedCompany;
};
