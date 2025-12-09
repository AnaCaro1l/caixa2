import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasMany, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { Payment } from './Payment';
import { Company } from './Company';

export enum UserProfile {
    ADMIN = 99,
    SUPERVISOR = 50,
    GERENTE = 10,
    VENDEDOR = 1
}

@Table
export class User extends Model<User> {
  @Column
  name: string;

  @Column
  email: string;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @Column(DataType.VIRTUAL)
  password: string;

  @Column
  passwordHash: string;

  @Column
  profile: number;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @HasMany(() => Payment)
  payments: Payment[];

  @BelongsTo(() => Company)
  company: Company;


}
