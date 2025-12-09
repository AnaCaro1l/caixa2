import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from './User';
import { Company } from './Company';

@Table
export class Payment extends Model<Payment> {

  @Column
  value: number;

  @Column
  status: 'pago' | 'pendente' | 'atrasado';

  @Column
  paymentLink: string;

  @Column
  dueDate: Date;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @BelongsTo(() => Company)
  company: Company;

}
