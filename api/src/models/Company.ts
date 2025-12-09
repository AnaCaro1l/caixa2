import {
  Column,
  CreatedAt,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from './User';

@Table
export class Company extends Model<Company> {
  @Column
  name: string;

  @ForeignKey(() => User)
  @Column
  adminId: number;

  @ForeignKey(() => User)
  @Column
  managerId: number;

  @ForeignKey(() => User)
  @Column
  salerId: number;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @HasMany(() => User, 'managerId')
  managers: User[];

  @HasMany(() => User, 'salerId')
  salers: User[];

  @HasOne(() => User, 'adminId')
  admin: User;
}
