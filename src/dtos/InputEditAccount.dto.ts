import z from 'zod'

export interface InputEditAccountDTO {
    token: string,
    currentPassword: string,
    userName?: string,
    newPassword?: string
}

export interface OutputEditAccoutDTO {
    message: string
}

export const inputEditAccountSchema = z.object(
    {
        token: z.string({required_error: "O token é obrigatório."}),
        currentPassword: z.string({required_error: "Informe a senha atual.", invalid_type_error: "A senha atual deve ser uma string"}),
        userName: z.string({invalid_type_error: "O nome deve ser enviado em uma string."}).min(3, {message: "Um nome deve ter no mínimo três caracteres."}).optional(),
        newPassword: z.string({invalid_type_error: "A senha deve ser enviado em uma string."}).min(5,{message: "A senha deve ter pelo menos cinco caracteres."}).optional()
    }
).transform(data => data as InputEditAccountDTO)