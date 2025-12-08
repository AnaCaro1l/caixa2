import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
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

  @BelongsTo(() => User)
  payer: User;
}
