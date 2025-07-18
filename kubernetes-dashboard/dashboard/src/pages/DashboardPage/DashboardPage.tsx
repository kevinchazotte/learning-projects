// src/pages/DashboardPage/DashboardPage.tsx
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { type Widget } from '@kubernetes-dashboard/dashboard-shared/types/widget';

import DashboardLayout from '../../components/layouts/DashboardLayouts/DashboardLayout';
import MetricChart from '../../components/dashboard/MetricChart/MetricChart';
import WidgetCard from '../../components/dashboard/WidgetCard/WidgetCard';
import RecentOrdersTable from '../../components/dashboard/RecentOrdersTable/RecentOrdersTable';


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


async function getWidgets(): Promise<Widget[]> {
  const response = await fetch("http://127.0.0.1:56811/api/dashboard/widgets");
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`)
  }
  return await response.json();
}


const DashboardPage: React.FC = () => {
  const data = mockDashboardData; // Using mock data still
  const [widgets, setWidgets] = React.useState<Widget[]>([]);
  React.useEffect(() => {
    getWidgets().then(setWidgets);
  }, []);

  return (
    <DashboardLayout>
      <Box mb={4}>
        <Typography variant="h4" component="h1">
          Dashboard Overview
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {widgets.map(widget => (
          <Grid key={widget.id} size={3}>
            <WidgetCard title={widget.title} value={widget.value} icon={widget.icon}/>
          </Grid>
        ))}

        <Grid size={6}>
          <MetricChart data={data.metricData} />
        </Grid>
        <Grid size={6}>
          <RecentOrdersTable orders={data.recentOrders} />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default DashboardPage;