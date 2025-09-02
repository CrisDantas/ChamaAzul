import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import z from "zod";

const orderFilterSchema = z.object({
    orderId: z.string().optional(),
    costumerName: z.string().optional(),
    status: z.string().optional(),
})

type orderFilterSchema = z.infer<typeof orderFilterSchema>

export function OrderTableFilers() {
    const [searchParams, setSearchParams] = useSearchParams()

    const orderId = searchParams.get('orderId')
    const costumerName = searchParams.get('costumerName')
    const status = searchParams.get('status')

    const { register, handleSubmit, control } = useForm<orderFilterSchema>({
        resolver: zodResolver(orderFilterSchema),
        defaultValues: {
            orderId: orderId ?? '',
            costumerName: costumerName ?? '',
            status: status ?? 'all',
        }
    })

    function handleFilter({ orderId, costumerName, status }: orderFilterSchema) {
        setSearchParams(state => {
            if (orderId) {
                state.set('orderId', orderId)
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
            <span className="text-sm font-semibold">Filtros:</span>
            <Input placeholder="ID do pedido" className="h-8 w-auto" {...register('orderId')} />
            <Input placeholder="Nome do cliente" className="h-8 w-[320px]" {...register('costumerName')} />
            <Controller
                name="status"
                control={control}
                render={({ field: { name, onChange, value, disabled } }) => {
                    return (
                        <Select
                            name={name}
                            onValueChange={onChange}
                            value={value}
                            disabled={disabled}
                        >
                            {/* botao que abre o select  */}
                            <SelectTrigger className="h-8 w-[180px]">
                                {/* exibe o texto do item selecionado atualmente pelo usuario */}
                                <SelectValue defaultValue="all" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all"> Todos status</SelectItem>
                                <SelectItem value="pending"> Pendente</SelectItem>
                                <SelectItem value="cancelled"> Cancelado </SelectItem>
                                <SelectItem value="processing">Em preparo</SelectItem>
                                <SelectItem value="delivering">Em entrega</SelectItem>
                                <SelectItem value="delivered">Entregue</SelectItem>
                            </SelectContent>
                        </Select>
                    )
                }}
            />

            <Button type="submit" variant="secondary" size="sm">
                <Search className="mr-2 h-4 w-4" />
                Filtrar resultados
            </Button>
            <Button type="button" variant="outline" size="sm">
                <X className="mr-2 h-4 w-4" />
                Remover filtros
            </Button>
        </form>
    )
}