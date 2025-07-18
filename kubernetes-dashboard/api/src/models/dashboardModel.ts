// api/src/models/dashboardModel.ts
import pool from '../config/db';
import { type Widget } from '@kubernetes-dashboard/dashboard-shared/types/widget';

export const getWidgets = async (): Promise<Widget[]> => {
    const result = await pool.query<Widget>('SELECT * FROM widgets ORDER BY id ASC');
    return result.rows;
};
