'use client';

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    PaginationState,
} from '@tanstack/react-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from 'src/components/ui/pagination';
import { useNavigate } from 'react-router-dom';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { Button } from '../ui/button';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const navigate = useNavigate();

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 6,
    });
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
    });

    return (
        <div className="h-full flex flex-col pb-4">
            <div className="flex-1 min-h-[400px]">
                <div className="rounded-md border text-white">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className=" hover:!bg-transparent">
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id} className="text-white cursor-default">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        onClick={() => {
                                            // @ts-expect-error id is not in the original object
                                            const idUSer = row.original.id;
                                            navigate(`/profileUserPage/${idUSer}`);
                                        }}
                                        key={row.id}
                                        data-state={row.getIsSelected() && 'selected'}
                                        className="cursor-pointer"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="flex items-center justify-center py-4">
                {table.getPageCount() > 0 && (
                    <>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => table.previousPage()}
                                        disabled={!table.getCanPreviousPage()}
                                        className="text-black"
                                    >
                                        <FaArrowLeft />
                                    </Button>
                                </PaginationItem>
                                {Array(table.getPageCount())
                                    .fill(0)
                                    .map((_, index) => (
                                        <PaginationItem key={index}>
                                            <PaginationLink
                                                onClick={() => {
                                                    setPagination((prev) => ({ ...prev, pageIndex: index }));
                                                }}
                                                isActive={index === pagination.pageIndex}
                                                className={`text-white cursor-pointer hover:!text-black ${
                                                    index === pagination.pageIndex && '!text-black'
                                                }`}
                                            >
                                                {index + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                <PaginationItem>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => table.nextPage()}
                                        disabled={!table.getCanNextPage()}
                                        className="text-black"
                                    >
                                        <FaArrowRight />
                                    </Button>
                                </PaginationItem>
                            </PaginationContent>
                            <div className="ml-4">
                                <Select
                                    onValueChange={(value) =>
                                        setPagination((prev) => ({ ...prev, pageSize: Number(value) }))
                                    }
                                >
                                    <SelectTrigger className="w-[120px] text-black p-1">
                                        <SelectValue placeholder={`PageSize ${pagination.pageSize}`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={'6'} className="text-black text-center">
                                            PageSize 6
                                        </SelectItem>
                                        <SelectItem value={'8'} className="text-black text-center">
                                            PageSize 8
                                        </SelectItem>
                                        <SelectItem value={'10'} className="text-black text-center">
                                            PageSize 10
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </Pagination>
                    </>
                )}
            </div>
        </div>
    );
}
