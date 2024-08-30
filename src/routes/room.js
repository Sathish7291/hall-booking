import express from 'express';
import roomController from '../controller/roomController.js'

const router = express.Router()
router.get('/',roomController.BookedRooms)
router.get('/customer',roomController.allCustomer)
router.post('/create',roomController.CreateRoom)
router.delete('/delete/:id',roomController.DeleteRoom)
router.put('/book/:id',roomController.Booking)

export default router