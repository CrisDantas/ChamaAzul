
import { Button,  } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search } from 'lucide-react'


export function Orders() {
    return (
        <>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
            </div>
            <div className="space-y-2.5">
                <form className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Filtros:</span>
                    <Input placeholder="Nome do cliente" className="h-8 w-[320px]" />
                </form>

                <div className='border rounded-md' >
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>botao</TableHead>
                                <TableHead>Identificar</TableHead>
                                <TableHead>Realizado há</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Clientes</TableHead>
                                <TableHead>Totoal do pedido</TableHead>
                                <TableHead>botao</TableHead>
                                <TableHead>botao</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                   <Button className='variant="outline" size=-"xs"'>
                                    <Search className='h-3 w-3'/>
                                    <span className='sr-only '>Detalhes do pedido</span>
                                   </Button>
                                </TableCell>
                                
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}