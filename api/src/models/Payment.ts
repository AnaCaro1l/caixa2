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

@Table
export class Payment extends Model<Payment> {
  @ForeignKey(() => User)
  @Column
  payerId: number;

  @Column
  value: number;

  @Column
  status: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @BelongsTo(() => User)
  payer: User;
}
