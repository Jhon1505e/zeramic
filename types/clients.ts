import type { Condition, ObjectId } from "mongodb";

export interface IClient {
    _id?: Condition<ObjectId>;
    fullName?: string;
    email: string;
    password: string;
    picture?: string;
    phone?: string;
    docType?: string;
    docId?: string;
    address?: string;
    infoDirection?: string;
    city?: string;
    departmentCode?: string;
    departmentOrStateName?: string;
    locationCode?: string;
    locationName?: string;
    admin?: boolean;
    state: string;
}