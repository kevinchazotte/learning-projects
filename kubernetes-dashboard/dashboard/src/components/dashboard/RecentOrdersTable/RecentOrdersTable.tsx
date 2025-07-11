// src/components/dashboard/RecentOrdersTable/RecentOrdersTable.tsx
import React from 'react';
import { Paper, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

interface Order {
  id: string;
  customer: string;
  total: number;
  status: string;
}

interface RecentOrdersTableProps {
  orders: Order[];
}

const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({ orders }) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Recent Orders
      </Typography>
      <TableContainer>
        <Table size="small" aria-label="recent orders table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell align="right">${order.total.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RecentOrdersTable;