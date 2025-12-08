import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Payment } from './Payment';

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

  @Column
  cpf: string;

  @Column(DataType.VIRTUAL)
  password: string;

  @Column
  passwordHash: string;

  @Column
  profile: number;

  @HasMany(() => Payment)
  payments: Payment[];
}
