'use client';

import { ColumnDef } from '@tanstack/react-table';
import { UserAccountType } from 'src/mock/ListAccount';

export const columnsTable: ColumnDef<UserAccountType>[] = [
    {
        accessorKey: 'STT',
        header: () => <div className="text-[12px] text-left w-[45%]">STT</div>,
        cell: ({ row }) => {
            return <div className="flex items-center w-full justify-between">{row.index + 1}</div>;
        },
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'stateAccount',
        header: 'Trạng thái',
    },
    {
        accessorKey: 'group',
        header: 'Phòng ban (Nhóm)',
    },
    {
        accessorKey: 'contractType',
        header: 'Loại hợp đồng',
    },
];
