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
}