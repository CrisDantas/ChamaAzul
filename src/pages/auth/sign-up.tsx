import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner';
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerRestaurant } from "@/api/register-restaurant";

//quando o usuario fizer um submit o data sera um objeto que tem dentro o campo de email(string)
const signUpForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string(),
    email: z.string().email(),
})

//  infer: converte a estrutura SignUpForm do zod para tipagem do typescript
type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {

    const navigate = useNavigate()

    // *register: serve para registrar campos do formulario, *handleSubmit: lida com a entrega do formulario, isSubmiting: diz se o forms foi ou nao enviado
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SignUpForm>()

    const { mutateAsync: registerRestaurantFn } = useMutation({
        mutationFn: registerRestaurant
    })

    async function handleSignUp(data: SignUpForm) {

        try {
            await registerRestaurantFn({
                restaurantName: data.restaurantName,
                managerName: data.managerName,
                email: data.email,
                phone: data.phone,
            })

            toast.success('Restaurante cadastrado com sucesso!', {
                action: {
                    label: 'Login ',
                    onClick: () => navigate(`/sign-in?email=${data.email}`),
                }
            })
        } catch {
            toast.error('Erro ao cadastrar restaurante.')
        }

    }

    return (
        <div className="p-8">

            <Button variant="ghost" asChild className="absolute right-8 top-8">
                < Link to="/sign-in">
                    Fazer login
                </Link>
            </Button>

            <div className="w-[350px] flex flex-col justify-center gap-6">
                <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Criar conta grátis</h1>
                    <p className="text-sm text-muted-foreground">
                        Seja um parceiro e comece suas vendas! </p>
                </div>

                {/* a funçao handlesubmit chama a funcao handlesignup enviando os dados do formulario */}
                <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
                        <Input
                            type="text"
                            id="restaurantName"
                            {...register('restaurantName')} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="managerName">Seu nome</Label>
                        <Input
                            type="text"
                            id="managerName"
                            {...register('managerName')} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Seu e-mail</Label>
                        <Input type="email" id="email" {...register('email')} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Seu celular</Label>
                        <Input
                            type="tel"
                            id="phone"
                            {...register('phone')} />
                    </div>

                    <Button disabled={isSubmitting} className="w-full" type="submit" > Finalizar cadastro</Button>
                </form>
            </div>
        </div>

    )
}
