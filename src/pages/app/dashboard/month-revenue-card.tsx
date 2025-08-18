import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export function MonthRevenueCard() {
    return (
        <Card>
            <CardHeader className="flex items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">
                    Receita total do (mes)
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
                <span className="text-2xl font-bold tracking-tight">
                    R$ 1.300,56
                </span>
                <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500"> +2% </span> em relação ao mês passado
                </p>
            </CardContent>
        </Card>
    )
}