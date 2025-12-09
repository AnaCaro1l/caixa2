import { Payment } from "./payment";
import { User } from "./user";

export interface Campany {
    id: number;
    name: string;
    adminId: number;
    createdAt: Date;
    updatedAt: Date;
    payments?: Payment[];
    managers?: User[];
    salers?: User[];
    admin?: User;
}