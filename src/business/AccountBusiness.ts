import { AccountDatabase } from "../database/AccountDatabase";
import { InputCreateAccountDTO } from "../dtos/InputCreateAccount.dto";
import { ConflictError } from "../errors/ConflictError";
import { Account } from "../models/Account";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, TokenPayload } from "../services/TokenManager";
import { ACCOUNT_ROLES, InputCreateAccountDB } from "../types/types";

export class AccountBusiness {

    constructor(
        private accountDatabase: AccountDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ){}

    public createAccount = async (input: InputCreateAccountDTO) => {
        
        const {userName, email, password} = input

        const emailExist = await this.accountDatabase.findAccount("email", email)

        if(emailExist){
            throw new ConflictError("O email já existe.")
        }

        const id = this.idGenerator.generate()

        const newAccount = new Account(
            id,
            userName,
            email,
            password,
            new Date().toISOString()
        )
        
    
        const payload: TokenPayload = {
            id,
            name: userName,
            role: ACCOUNT_ROLES.NORMAL
        }

        const token = this.tokenManager.createToken(payload)
    }
}