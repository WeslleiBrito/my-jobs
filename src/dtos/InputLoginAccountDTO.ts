import z from "zod"

export interface InputLoginAccountDTO {
    email: string,
    password: string
}

export interface OutputLoginAccount {
    token: string
}


export const inputLoginAccountSchema = z.object(
    {
        email: z.string({required_error: "O email é obrigatório.", invalid_type_error: "O email deve ser uma string."}).email({message: "Email inválido."}),
        password: z.string({required_error: "A senha é obrigatório.", invalid_type_error: "A senha deve ser uma string."})
    }
).transform(data => data as InputLoginAccountDTO)