// src/pages/DashboardPage/DashboardPage.tsx
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import DashboardLayout from '../../components/layouts/DashboardLayouts/DashboardLayout';
import MetricChart from '../../components/dashboard/MetricChart/MetricChart';
import WidgetCard from '../../components/dashboard/WidgetCard/WidgetCard';
import RecentOrdersTable from '../../components/dashboard/RecentOrdersTable/RecentOrdersTable';

// --- Dummy Data (In a real app, this would come from an API/state management) ---
const mockDashboardData = {
  totalMetric: 152345,
  newUsers: 125,
  ordersPending: 18,
  revenueGrowth: 7.2,
  metricData: [
    { name: 'Jan', metric: 4000 },
    { name: 'Feb', metric: 3000 },
    { name: 'Mar', metric: 5000 },
    { name: 'Apr', metric: 4500 },
    { name: 'May', metric: 6000 },
    { name: 'Jun', metric: 5500 },
  ],
  recentOrders: [
    { id: '1', customer: 'Alice Smith', total: 120.50, status: 'Pending' },
    { id: '2', customer: 'Bob Johnson', total: 250.00, status: 'Completed' },
    { id: '3', customer: 'Charlie Brown', total: 75.20, status: 'Shipped' },
    { id: '4', customer: 'Diana Miller', total: 300.00, status: 'Pending' },
  ],
};
// ----------------------------------------------------------------------------------

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const DashboardPage: React.FC = () => {
  // In a real app, you'd use a hook like `useDashboardData` here
  // const { data, loading, error } = useDashboardData();
  const data = mockDashboardData; // Using mock data for this example

  return (
    <DashboardLayout>
      <Box mb={4}>
        <Typography variant="h4" component="h1">
          Dashboard Overview
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Widget Cards */}
        <Item>
          <WidgetCard title="Total Metric" value={`$${data.totalMetric.toLocaleString()}`} icon="💸" />
        </Item>
        <Item>
          <WidgetCard title="New Users" value={data.newUsers} icon="👥" />
        </Item>
        <Item>
          <WidgetCard title="Orders Pending" value={data.ordersPending} icon="📦" />
        </Item>
        <Item>
          <WidgetCard title="Revenue Growth" value={`${data.revenueGrowth}%`} icon="📈" />
        </Item>

        {/* Sales Chart */}
        <Item>
          <MetricChart data={data.metricData} />
        </Item>

        {/* Recent Orders Table */}
        <Item>
          <RecentOrdersTable orders={data.recentOrders} />
        </Item>
      </Grid>
    </DashboardLayout>
  );
};

export default DashboardPage;