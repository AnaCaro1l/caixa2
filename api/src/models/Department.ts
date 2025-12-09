import { BelongsTo, Column, CreatedAt, ForeignKey, HasMany, Model, Table, UpdatedAt } from "sequelize-typescript";
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

    @CreatedAt
    @Column
    createdAt: Date;

    @UpdatedAt
    @Column
    updatedAt: Date;

    @BelongsTo(() => User, 'supervisorId')
    supervisor: User;

    @BelongsTo(() => Company)
    company: Company;
}