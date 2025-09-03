import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableRow, TableCell } from "@/components/ui/table";
import { Search, ArrowRight, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "@/components/order-status";
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from "react";

export interface OrderTableRowProps {
    order: {
        orderId: string;
        createdAt: string;
        status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
        customerName: string;
        total: number;
    }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
    const [isDeteailsOpen, setIsDetailsOpen] = useState(false)

    return (
        <TableRow>
            <TableCell>
                <Dialog open={ isDeteailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do pedido</span>
                        </Button>
                    </DialogTrigger>
                    {/* tabela secundaria com todos os detalhes do pedido que abre igual pop up */}
                    <OrderDetails open={isDeteailsOpen} orderId={'orderId'}/>
                </Dialog>

            </TableCell>
            <TableCell className="font-mono text-xs font-medium">
                {order.orderId}
            </TableCell>
            <TableCell className="text-muted-foreground">
                {formatDistanceToNow(order.createdAt, {
                    locale: ptBR,
                    addSuffix: true,
                })}
            </TableCell>
            <TableCell>
                <OrderStatus status={order.status} />
            </TableCell>
            <TableCell className="font-medium">
                {order.customerName}
            </TableCell>
            <TableCell className="font-medium">{order.total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            })}</TableCell>
            <TableCell>
                <Button variant="outline" size="sm">
                    <ArrowRight className="mr-2 h-3 w-3" />
                    Aprovar
                </Button>
            </TableCell>
            <TableCell>
                <Button variant="ghost" size="sm">
                    <X className="mr-2 h-3 w-3" />
                    Cancelar
                </Button>
            </TableCell>
        </TableRow>
    )
}