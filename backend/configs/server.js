'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import limiter from '../src/middlewares/validar-cant-peticiones.js'

import  { dbConnection } from './mongo.js';

import authRoutes from '../src/auth/auth.routes.js';
import userRoutes from '../src/users/user.routes.js';
import categoryRoutes from '../src/categories/category.routes.js';
import hotelRoutes from '../src/hotels/hotel.routes.js';
import roomRoutes from '../src/rooms/room.routes.js';
import reservationRoutes from '../src/reservations/reservation.routes.js';
import eventRoutes from '../src/EventsHotels/event.routes.js';
import invoiceRoutes from '../src/invoices/invoices.routes.js';
import statisticsRoutes from '../src/statistics/statistics.routes.js';

const middlewares = (app) => {
    app.use(express.urlencoded({extended : false}));
    app.use(express.json());
    app.use(cors());
    app.use(helmet()); 
    app.use(morgan('dev'));
    app.use(limiter);
};

const routes = (app) => {
    app.use('/gestorHoteles/v1/auth', authRoutes);
    app.use('/gestorHoteles/v1/users', userRoutes);
    app.use('/gestorHoteles/v1/categories', categoryRoutes);
    app.use('/gestorHoteles/v1/hotels', hotelRoutes);
    app.use('/gestorHoteles/v1/rooms', roomRoutes);
    app.use('/gestorHoteles/v1/reservations', reservationRoutes);
    app.use('/gestorHoteles/v1/events', eventRoutes);
    app.use('/gestorHoteles/v1/invoices', invoiceRoutes);
    app.use('/gestorHoteles/v1/statistics', statisticsRoutes);
};

export const conetarDB = async() => {
    try {
        await dbConnection();
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error connecting to database', error) 
    }
};

export const initServer = async () => {
    const app = express();
    const port = process.env.PORT || 3001;

    try {
        middlewares(app);
        conetarDB(app);
        routes(app);
        app.listen(port);
        console.log(`Server running on port ${port}`);
    } catch (error) {
        console.log(`Server init failed ${error}`)
    }
}

