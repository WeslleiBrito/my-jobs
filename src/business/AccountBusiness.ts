import { AccountDatabase } from "../database/AccountDatabase";
import { InputSignupAccountDTO, OutputSignupAccoutDTO } from "../dtos/InputSignupAccount.dto";
import { ConflictError } from "../errors/ConflictError";
import { Account } from "../models/Account";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, TokenPayload } from "../services/TokenManager";
import { ACCOUNT_ROLES, InputCreateAccountDB } from "../types/types";

export class AccountBusiness {

    constructor(
        private accountDatabase: AccountDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ){}

    public signup = async (input: InputSignupAccountDTO): Promise<OutputSignupAccoutDTO> => {
        
        const {userName, email, password} = input

        const [emailExist] = await this.accountDatabase.findAccount("email", email)

        if(emailExist){
            throw new ConflictError("O email já existe.")
        }

        const id = this.idGenerator.generate()

        const hashPassword = await this.hashManager.hash(password)

        const newAccount = new Account(
            id,
            userName,
            email,
            hashPassword,
            new Date().toISOString()
        )
        

        const payload: TokenPayload = {
            id,
            name: userName,
            role: ACCOUNT_ROLES.NORMAL
        }

        const inputAcountDB: InputCreateAccountDB = {
            id: newAccount.getId(),
            user_name: newAccount.getUserName(),
            email: newAccount.getEmail(),
            password: newAccount.getPassword(),
            created_at: newAccount.getCreatedAt()
        }

        await this.accountDatabase.signup(inputAcountDB)

        const token = this.tokenManager.createToken(payload)

        return {
            token
        }
    }
}