import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasMany, HasOne, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { Payment } from './Payment';
import { Company } from './Company';
import { Department } from './Department';

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

  @ForeignKey(() => Department)
  @Column
  departmentId: number;

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

  @HasOne(() => Company)
  company: Company;

  @HasMany(() => Department)
  department: Department;

}
