// api/src/controllers/dashboardController.ts
import { Request, Response } from 'express';
import * as dashboardService from '../services/dashboardService';

export const getDashboardWidgets = async (request: Request, response: Response): Promise<void> => {
    try {
        const widgets = await dashboardService.fetchDashboardWidgets();
        response.json(widgets);
    } catch (error: any) {
        console.error('Error getting dashboard widgets in controller: ', error);
        response.status(500).json({ message: error.message || 'Internal Server Error' });
    }
};
