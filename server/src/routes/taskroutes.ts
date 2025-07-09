import express from 'express';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/controllers';

const router = express.Router();

router.get('/ping', (req, res) => {
  console.log("✅ /api/events/ping hit");
  res.send("pong");
});

router.get('/', getEvents); 
router.post('/', createEvent); 
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;