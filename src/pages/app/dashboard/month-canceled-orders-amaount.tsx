import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceld-orders-amount";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";

export function MonthCanceledOrdersAmount() {
    const { data: monthCanceledOrdersAmount } = useQuery({
        queryKey: ['metrics', 'month-canceled-orders-amount'],
        queryFn: getMonthCanceledOrdersAmount,
    })

    return (
        <Card>
            <CardHeader className="flex items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">
                    Cancelamentos no (mês)
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
                {monthCanceledOrdersAmount && (
                    <>
                        <span className="text-2xl font-bold tracking-tight">
                            {monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
                        </span>
                        <p className="text-xs text-muted-foreground">
                            {monthCanceledOrdersAmount.diffFromLastMonth < 0 ? (
                                <>
                                    <span className="text-emerald-500 dark:text-emerald-400">
                                        {monthCanceledOrdersAmount.diffFromLastMonth}%
                                    </span>{' '}
                                    em relação ao mês passado
                                </>
                            ) : (
                                <>
                                    <span className="text-rose-500 dark:text-rose-400">
                                        +{monthCanceledOrdersAmount.diffFromLastMonth}%
                                    </span>{' '}
                                    em relação ao mês passado
                                </>
                            )}
                        </p>
                    </>
                )}
            </CardContent>
        </Card>
    )
}