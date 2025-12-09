import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from './User';
import { Payment } from './Payment';

@Table
export class Company extends Model<Company> {
  @Column
  name: string;

  @ForeignKey(() => User)
  @Column
  adminId: number;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @HasMany(() => Payment)
  payments: Payment[];

  @HasMany(() => User)
  managers: User[];

  @HasMany(() => User)
  salers: User[];

  @BelongsTo(() => User, 'adminId')
  admin: User;
}
