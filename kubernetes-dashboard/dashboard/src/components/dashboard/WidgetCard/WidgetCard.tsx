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
    <Paper elevation={3} sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, height: 120, overflow: 'hidden' }}>
      <Box sx={{ fontSize: '2rem', flexShrink: 0, minWidth: { xs: '40px', sm: '50px', md: '60px' } }}>{icon}</Box> {/* Simple icon */}
      <Box sx={{ minWidth: 0, flex: 1, display: { xs: 'none', sm: 'block' } }}>
        <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whitespace: 'nowrap' }}>
          {title}
        </Typography>
        <Typography variant="h5" component="div" sx={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {value}
        </Typography>
      </Box>
    </Paper>
  );
};

export default WidgetCard;