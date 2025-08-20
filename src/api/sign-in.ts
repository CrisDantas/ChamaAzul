import { api } from "@/lib/axios";

// tipa o tipo de entrada na requisiçao
export interface SignInBody {
    email: string
}

export async function signIn({ email }: SignInBody) {
    await api.post('/authenticate', { email })
}