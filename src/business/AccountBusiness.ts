import { AccountDatabase, inputEditAccountDB } from "../database/AccountDatabase";
import { InputEditAccountDTO, OutputEditAccoutDTO } from "../dtos/InputEditAccount.dto";
import { InputLoginAccountDTO, OutputLoginAccount } from "../dtos/InputLoginAccountDTO";
import { InputSignupAccountDTO, OutputSignupAccoutDTO } from "../dtos/InputSignupAccount.dto";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { UnprocessableEntityError } from "../errors/UnprocessableEntityError";
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
            ACCOUNT_ROLES.NORMAL,
            new Date().toISOString()
        )
        

        const inputAcountDB: InputCreateAccountDB = {
            id: newAccount.getId(),
            user_name: newAccount.getUserName(),
            email: newAccount.getEmail(),
            role: newAccount.getRole(),
            password: newAccount.getPassword(),
            created_at: newAccount.getCreatedAt()
        }
        
        await this.accountDatabase.signup(inputAcountDB)
        
        const payload: TokenPayload = {
            id,
            name: userName,
            role: ACCOUNT_ROLES.NORMAL
        }

        const token = this.tokenManager.createToken(payload)

        return {
            token
        }
    }

    public login = async (input: InputLoginAccountDTO): Promise<OutputLoginAccount> => {
        const {email, password} = input

        const [emailExist] = await this.accountDatabase.findAccount("email", email)

        if(!emailExist){
            throw new NotFoundError("Email inválido.")
        }

        const hashPassword = await this.hashManager.compare(password, emailExist.password)

        if(!hashPassword){
            throw new UnprocessableEntityError("Email ou senha inválida.")
        }

        const token = this.tokenManager.createToken({id: emailExist.id, name: emailExist.user_name, role: emailExist.role})

        return {
            token
        }
    }

    public editAccount = async (input: InputEditAccountDTO): Promise<OutputEditAccoutDTO> => {
        
        const {token, userName, currentPassword, newPassword} = input

        const tokenIsValid = this.tokenManager.validateToken(token)

        if(!tokenIsValid){
            throw new UnauthorizedError("Token inválido.")
        }

        const [accountDB] = await this.accountDatabase.findAccount("id", tokenIsValid.id)

        const currentPasswordIsValid = await this.hashManager.compare(currentPassword, accountDB.password)

        if(!currentPasswordIsValid){
            throw new UnauthorizedError("Senha atual inválida.")
        }

        const updateAccoutDB: inputEditAccountDB = {
            id: tokenIsValid.id,
            user_name: userName || accountDB.user_name,
            newPassword: newPassword || accountDB.password,

        }

        await this.accountDatabase.editAccount(updateAccoutDB)

        return {
            message: "Editado com sucesso!"
        }
    }
}