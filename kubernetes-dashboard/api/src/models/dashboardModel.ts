// api/src/models/dashboardModel.ts
import pool from '../config/db';
import { Widget } from '../types/dashboardTypes';

export const getWidgets = async (): Promise<Widget[]> => {
    const result = await pool.query<Widget>('SELECT * FROM widgets ORDER BY id ASC');
    return result.rows;
};
