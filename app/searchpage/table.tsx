import React from 'react'
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { ColumnDef } from '@tanstack/react-table';

import { ObjectId } from 'mongodb';
import Link from 'next/link';

interface Trip {
  _id: ObjectId;
  user: ObjectId;
  startLocation: string;
  endLocation: string;
  date: Date;
  time: string;
  availableSeats: number;
  occupiedSeats: number;
  occupants: string[]; 
  notes: string;
  createdAt: Date;
  __v: number;
}
const columnHelper = createColumnHelper<Trip>()

const columns = [
  columnHelper.accessor('startLocation',{
    header:'Start Location',
    cell: info => info.getValue(),
    footer: info => info.column.id
  }),
  columnHelper.accessor('endLocation',{
    header:'End Location',
    cell: info => info.getValue(),
    footer: info => info.column.id
  }),
  columnHelper.accessor('date',{
    header:'Date of Travel',
    cell: info => {
      const dateValue = new Date(info.getValue());
      const formattedDate = dateValue.toISOString().split('T')[0];
      return formattedDate;
    },
    footer: info => info.column.id
  }),

  columnHelper.accessor('time',{
    header:'Travel Start Time',
    cell: info => info.getValue(),
    footer: info => info.column.id
  }),
  columnHelper.accessor('availableSeats',{
    header:'Available seats',
    cell: info => info.getValue(),
    footer: info => info.column.id
  }),
  columnHelper.display({
    header: 'View Posting',
    cell: info => {
      const postId = info.row.original._id;
      return (
        <Link href={`/posting/${postId}`} target="_blank" className='text-sky-500' rel="noopener noreferrer">
          {`click`}
        </Link>
      );
    },
  }),


]
interface TableProps {
  data: Trip[];
}

const Table: React.FC<TableProps> = ({data}) => {
    
    const tableInstance = useReactTable({
        columns,
        data,
        getCoreRowModel:getCoreRowModel()
      });
  return (
    <div className='w-full pt-12'>

      <table className='w-full'>
          <thead>
            {
              tableInstance.getHeaderGroups().map(
                (headerGroup)=>(
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id} className='text-black'>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>

                )
                
              )
            }
            
          </thead>
          <tbody>
            {
              tableInstance.getCoreRowModel().rows.map((row)=>(
                <tr key={row.id}>
                  {
                    row.getAllCells().map(cell=>(
                      <td key={cell.id} className='text-black text-center'>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
      </table>
    </div>

  )
}

export default Table