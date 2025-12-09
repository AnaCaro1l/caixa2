import { Request, Response } from 'express';
import { CreateCompanyService } from '../services/CompanyServices/CreateCompanyService';
import { UpdateCompanyService } from '../services/CompanyServices/UpdateCompanyService';
import { ShowCompanyService } from '../services/CompanyServices/ShowCompanyService';

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { name } = req.body;
  const adminId = req.user.id;

  const company = await CreateCompanyService({ name, adminId });

  return res.status(201).json(company);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.id;

  const company = await ShowCompanyService(id);

  return res.status(200).json(company);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;
  const companyData = req.body;

  const updatedCompany = await UpdateCompanyService({ id, companyData });

  return res.status(200).json(updatedCompany);
};
