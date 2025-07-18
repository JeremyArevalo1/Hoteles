import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from "../middlewares/validar-jwt.js";
import { tieneRole } from "../middlewares/validar-roles.js";

import { addRoom, viewRooms, updateRoom, deleteRoom, getRoomsByHotel } from './room.controller.js'

import { validateCapacityAndPriceAndNumberRoom, confirmDeleteRoom, validateRoomExists } from  '../middlewares/validar-rooms.js';

const router = Router();

router.post(
    "/addRoom",
    [
        validarJWT,
        tieneRole('HOTEL_ADMIN'),
        validateRoomExists,
        validateCapacityAndPriceAndNumberRoom,
        validarCampos
    ],
    addRoom
);

router.get("/viewRooms",viewRooms);

router.get("/getRoomsByHotel/:id", getRoomsByHotel);

router.put(
    "/updateRoom/:id",
    [
        validarJWT,
        tieneRole('HOTEL_ADMIN'),
        validateCapacityAndPriceAndNumberRoom,
        validarCampos
    ],
    updateRoom
);


router.delete(
    "/deleteRoom/:id",
    [
        validarJWT,
        tieneRole('HOTEL_ADMIN'),
        check("id", "It is not a valid id").isMongoId(),
        confirmDeleteRoom,
        validarCampos
    ],
    deleteRoom
);


export default router;