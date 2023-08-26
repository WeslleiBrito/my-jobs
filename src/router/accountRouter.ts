import express from "express"
import { AccountController } from "../controller/AccountController"
import { AccountBusiness } from "../business/AccountBusiness"
import { AccountDatabase } from "../database/AccountDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { HashManager } from "../services/HashManager"


export const accountRouter = express.Router()


const newAccountController = new AccountController(
    new AccountBusiness(
        new AccountDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)

accountRouter.post('/signup', newAccountController.signup)