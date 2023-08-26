import z from 'zod'

export interface InputCreateAccountDTO {
    userName: string,
    email: string,
    password: string
}

export interface OutputCreateAccoutDTO {
    token: string
}

export const inputCreateAccountSchema = z.object(
    {
        userName: z.string({required_error: "O nome do usuário é obrigatório.", invalid_type_error: "O nome deve ser enviado em uma string."}).min(3, {message: "Um nome deve ter no mínimo três caracteres."}),
        email: z.string({required_error: "O email é obrigatório.", invalid_type_error: "O email deve ser enviado em uma string."}).email({message: "Email inválido!"}),
        password: z.string({required_error: "A senha é obrigatório.", invalid_type_error: "A senha deve ser enviado em uma string."}).min(5,
            {
                message: "A senha deve ter pelo menos cinco caracteres."
            } 
        )
    }
)