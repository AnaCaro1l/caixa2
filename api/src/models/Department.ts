import { BelongsTo, Column, CreatedAt, ForeignKey, HasMany, HasOne, Model, Table, UpdatedAt } from "sequelize-typescript";
import { User } from "./User";
import { Company } from "./Company";

@Table
export class Department extends Model<Department> {

    @Column
    name: string;

    @ForeignKey(() => Company)
    @Column
    companyId: number;

    @ForeignKey(() => User)
    @Column
    supervisorId: number;

    @ForeignKey(() => User)
    @Column
    salerId: number;

    @CreatedAt
    @Column
    createdAt: Date;

    @UpdatedAt
    @Column
    updatedAt: Date;

    @HasMany(() => User, 'salerId')
    salers: User[];

    @HasOne(() => User, 'supervisorId')
    supervisor: User;

    @BelongsTo(() => Company)
    company: Company;
}