import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dashboardRoutes from './routes/dashboardRoutes';

const app = express();
const port = process.env.PORT || 5000

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api/dashboard', dashboardRoutes);
app.get('/', (request, response) => {
    response.send('Dashboard API is running!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})