import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Link } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner';
import { useMutation } from "@tanstack/react-query";
import { signIn } from '@/api/sign-in'

//quando o usuario fizer um submit o data sera um objeto que tem dentro o campo de email(string)
const signInForm = z.object({
    email: z.string().email(),
})

//  infer: converte a estrutura SignInForm do zod para tipagem do typescript
type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
    // *register: serve para registrar campos do formulario, *handleSubmit: lida com a entrega do formulario, isSubmiting: diz se o forms foi ou nao enviado
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SignInForm>()

    const { mutateAsync: authenticate } = useMutation({
        mutationFn: signIn,
    })

    async function handleSignIn(data: SignInForm) {
        try {
            await authenticate({ email: data.email })

            toast.success('Enviamos um link de autenticação para o seu email.', {
                action: {
                    label: 'Reenviar',
                    onClick: () => handleSignIn(data),
                }
            })
        } catch {
            toast.error('Credenciais inválidas.')
        }

    }


    return (
        <div className="p-8">
            <Button variant="ghost" asChild className="absolute right-8 top-8">
                < Link to="/sign-up">
                    Novo estabelecimento
                </Link>
            </Button>


            <div className="w-[350px] flex flex-col justify-center gap-6">
                <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Acessar painel</h1>
                    <p className="text-sm text-muted-foreground">
                        Acompanhe suas vendas pelo painel do parceiro! </p>
                </div>

                {/* a funçao handlesubmit chama a funcao handlesignin enviando os dados do formulario */}
                <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Seu e-mail</Label>
                        <Input type="email" id="email" {...register('email')} />
                    </div>

                    <Button disabled={isSubmitting} className="w-full" type="submit" > Acessar painel</Button>
                </form>
            </div>
        </div>

    )
}
