
export interface InputCreateAccountDB {
    id: string,
    user_name: string,
    email: string,
    role: string,
    password: string
    created_at: string
}


export interface OutputAccoutDB {
    id: string,
    user_name: string,
    email: string,
    role: ACCOUNT_ROLES,
    password: string,
    created_at: string
}

export enum ACCOUNT_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}