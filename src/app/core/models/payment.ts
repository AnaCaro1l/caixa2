export interface Payment {
    id: number;
    value: number;
    status: 'pago' | 'pendente' | 'atrasado';
    paymentLink: string;
    dueDate: Date;
    companyId: number;
    createdAt: Date;
    updatedAt: Date;
}