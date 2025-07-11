// src/components/dashboard/WidgetCard/WidgetCard.tsx
import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

interface WidgetCardProps {
  title: string;
  value: string | number;
  icon: string;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ title, value, icon }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box sx={{ fontSize: '2.5rem' }}>{icon}</Box> {/* Simple icon */}
      <Box>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
          {value}
        </Typography>
      </Box>
    </Paper>
  );
};

export default WidgetCard;