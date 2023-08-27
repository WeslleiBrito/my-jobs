import { ACCOUNT_ROLES } from "../types/types"

export class Account {

    constructor(
        private id: string,
        private userName: string,
        private email: string,
        private password: string,
        private role: ACCOUNT_ROLES,
        private createdAt: string
    ){}

    public getId = (): string => {
        return this.id
    }

    public getUserName = (): string => {
        return this.userName
    }
    public getEmail = (): string => {
        return this.email
    }
    public getPassword = (): string => {
        return this.password
    }

    public getRole = (): string => {
        return this.role
    }
    
    public getCreatedAt = (): string => {
        return this.createdAt
    }

    public setPassword = (newPassword: string): void => {
        this.password = newPassword
    }

    public setUserName = (newUserName: string): void => {
        this.userName = newUserName
    }
}