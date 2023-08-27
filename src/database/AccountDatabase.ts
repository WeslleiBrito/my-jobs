import { InputCreateAccountDB, OutputAccoutDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class AccountDatabase extends BaseDatabase{

    protected static TABLE_ACCOUNT = "accounts"

    public signup = async (input: InputCreateAccountDB): Promise<void> => {

        await AccountDatabase.connection(AccountDatabase.TABLE_ACCOUNT).insert(input)
    }

    public findAccount = async (column: string, filter: string): Promise<OutputAccoutDB[]> => {

        const result: OutputAccoutDB[] =  await AccountDatabase.connection(AccountDatabase.TABLE_ACCOUNT).where({[column]: filter})

        return result
    }

    public editAccount = async (input: inputEditAccountDB) => {
        
        await AccountDatabase.connection(AccountDatabase.TABLE_ACCOUNT).update(
            {
                user_name: input.user_name,
                password: input.password
            }
        ).where({id: input.id})
    }
}

type inputEditAccountDB = {
    id: string,
    user_name: string,
    password: string
}