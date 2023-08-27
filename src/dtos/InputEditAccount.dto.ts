import z from 'zod'

export interface InputEditAccountDTO {
    token: string,
    userName?: string,
    password?: string
}

export interface OutputEditAccoutDTO {
    message: string
}

export const inputEditAccountSchema = z.object(
    {
        token: z.string({required_error: "O token é obrigatório."}),
        userName: z.string({invalid_type_error: "O nome deve ser enviado em uma string."}).min(3, {message: "Um nome deve ter no mínimo três caracteres."}).optional(),
        password: z.string({invalid_type_error: "A senha deve ser enviado em uma string."}).min(5,{message: "A senha deve ter pelo menos cinco caracteres."}).optional()
    }
)