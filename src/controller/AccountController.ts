import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { ZodError } from "zod";
import { AccountBusiness } from "../business/AccountBusiness";
import { inputSignupAccountSchema } from "../dtos/InputSignupAccount.dto";
import { inputEditAccountSchema } from "../dtos/InputEditAccount.dto";
import { inputLoginAccountSchema } from "../dtos/InputLoginAccountDTO";


export class AccountController {

    constructor(
        private accountBusiness: AccountBusiness
    ){}
    

    public signup = async (req: Request, res: Response) => {
        
        try {
            
            const input = inputSignupAccountSchema.parse(
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

    public login = async (req: Request, res: Response) => {
        
        try {
            
            const input = inputLoginAccountSchema.parse(
                {
                    email: req.body.email,
                    password: req.body.password
                }
            )

            const output = await this.accountBusiness.login(input)

            res.status(200).send(
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

    public editAccount = async (req: Request, res: Response) => {
        
        try {
            
            const input = inputEditAccountSchema.parse(
                {
                    token: req.headers.authorization,
                    currentPassword: req.body.currentPassword,
                    userName: req.body.userName,
                    newPassword: req.body.newPassword
                }
            )

            const output = await this.accountBusiness.editAccount(input)

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