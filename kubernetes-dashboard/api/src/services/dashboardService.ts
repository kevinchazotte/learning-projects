// api/src/services/dashboardService.ts
import * as dashboardModel from '../models/dashboardModel';
import { Widget } from '../types/dashboardTypes';

export const fetchDashboardWidgets = async (): Promise<Widget[]> => {
    try {
        const widgets = await dashboardModel.getWidgets();
        return widgets;
    } catch (error) {
        console.error('Error fetching dashboard widgets in service: ', error);
        throw new Error('Failed to fetch dashboard widgets')
    }
}