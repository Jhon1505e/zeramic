import type { Condition, ObjectId } from "mongodb";

export interface IClient {
    _id?: Condition<ObjectId>;
    name: string;
    email: string;
    picture: string;
    phone?: string;
    docType?: string;
    docId?: string;
    address?: string;
    city?: string;
    state: string;
}