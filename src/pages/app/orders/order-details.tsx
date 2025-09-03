import { getOrderDetails } from "@/api/get-order-details";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

export interface OrderDetailsProps{
    orderId: string
    open: boolean
}

export function OrderDetails({ orderId, open }: OrderDetailsProps) {
const { data: order} = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderDetails({ orderId}),
    enabled: open,
})

    return (
        // container 1 
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Pedido: 1545121203</DialogTitle>
                <DialogDescription>Detalhes do pedido</DialogDescription>
            </DialogHeader>

            {/* container 2  */}
            <div className="space-y-6">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Status</TableCell>
                            <TableCell className="flex justify-end">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                                    <span className="font-medium text-muted-foreground">
                                        Pendente
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Cliente</TableCell>
                            <TableCell className="flex justify-end">cris dantas</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Telefone</TableCell>
                            <TableCell className="flex justify-end">139999999</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Email</TableCell>
                            <TableCell className="flex justify-end">@gmail</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-muted-foreground">realizado há</TableCell>
                            <TableCell className="flex justify-end">há 15 minutos</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Produto</TableHead>
                            <TableHead className="text-right">Qtd</TableHead>
                            <TableHead className="text-right">Preço</TableHead>
                            <TableHead className="text-right">Subtotal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Pizza de calabresa</TableCell>
                            <TableCell className="text-right">1</TableCell>
                            <TableCell className="text-right"> R$ 20,00</TableCell>
                            <TableCell className="text-right">R$ 20,00</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total do pedido: </TableCell>
                            <TableCell className="text-right font-medium">
                                R$ 20,00
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </DialogContent>

    )
}