export interface User {
    _id?: string;
    fullname?: string;
    email: string;
    password: string;
}

export interface Image {
    _id: string;
    filename: string;
    originalname: string;
}

export interface Review {
    _id: string;
    review: string;
    rating: number;
    by?: ReviewBy;
    date?: number;
}

export interface ReviewBy {
    user_id: string;
    fullname: string;
}

export interface Owner {
    user_id: string;
    fullname: string;
    email: string;
}

export interface Medication {
    _id?: string;
    name: string;
    first_letter?: string;
    generic_name: string;
    medication_class: string;
    availability: string;
    image?: Image;
    added_by?: Owner;
    reviews?: Review[];
    createdAt?: string;
    updatedAt?: string;
}

export interface UserJwtDecode {
    _id: string;
    fullname: string;
    email: string;
}

export interface UserState {
    _id: string;
    fullname: string;
    email: string;
    jwt: string;
}

/** Response Types */
export interface ResponseType {
    success: boolean;
    // TODO: use explicit data type
    data: any; /** boolean | string | User | Medication | Medication[] | Review | Review[]  */
}
