import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { ZodError } from "zod";
import { AccountBusiness } from "../business/AccountBusiness";
import { InputCreateAccountDTO, inputCreateAccountSchema } from "../dtos/InputCreateAccount.dto";


export class AccountController {

    constructor(
        private accountBusiness: AccountBusiness
    ){}
    

    public signup = async (req: Request, res: Response) => {
        
        try {
            
            const input = inputCreateAccountSchema.parse(
                {
                    userName: req.body.userName,
                    email: req.body.email,
                    password: req.body.password
                }
            )

            const output = await this.accountBusiness.signup(input)

            res.status(201).send(
                output
            )
        } catch (error) {
            if(error instanceof ZodError){
                res.status(400).send(error.issues)
            }else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado\n " + error)
            }
        }
    }
}