import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableRow, TableCell } from "@/components/ui/table";
import { Search, ArrowRight, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "@/components/order-status";
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel-order";
import type { GetOrdersResponse } from "@/api/get-orders";

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
    const queryClient = useQueryClient()

    const { mutateAsync: cancelOrderFn } = useMutation({
        mutationFn: cancelOrder,
        async onSuccess(_, { orderId }) {
            const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
                queryKey: ['orders'],
            })

            ordersListCache.forEach(([cacheKey, cacheData]) => {
                if (!cacheData) {
                    return
                }

                queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
                    ...cacheData,
                    orders: cacheData.orders.map((order) => {
                        if (order.orderId === orderId) {
                            return { ...order, status: 'canceled' }
                        }

                        return order
                    }),
                })
            })
        },
    })

    return (
        <TableRow>
            <TableCell>
                <Dialog open={isDeteailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do pedido</span>
                        </Button>
                    </DialogTrigger>
                    {/* tabela secundaria com todos os detalhes do pedido que abre igual pop up */}
                    <OrderDetails open={isDeteailsOpen} orderId={order.orderId} />
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
            <TableCell className="font-medium">{(order.total / 100).toLocaleString('pt-BR', {
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
                <Button
                disabled={ !['pending','processing'].includes(order.status)}
                onClick={() => cancelOrderFn({ orderId: order.orderId}) }
                    variant="ghost"
                    size="sm"
                >
                    <X className="mr-2 h-3 w-3" />
                    Cancelar
                </Button>
            </TableCell>
        </TableRow>
    )
}