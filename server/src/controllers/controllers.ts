import 'dotenv/config';
import { Request, Response, RequestHandler } from 'express';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

/**
 * is where we define the functions for the CRUD logic/functionality
 * As well as processing the data we get into an acceptable json format for
 * FullCalendar to use to render into frontend 
 * 
 */

type Event = {
  id:number, 
  classTypeName: string,
  DayOfWeek: string,
  StartTime: string,
  EndTime: string,
  instructor: string,
  RecurStartDate: Date,
  RecurEndDate: Date
}



/**
 * 
 * @param req 
 * @param res 
 * @returns all rows from CalendarEvents table in Supabase 
 * The type of res.json(data) is type data = EventRow[] | null;
 * Where EventRow matches the database schema (column names + types)
 * Since all types are plain JS objects, they can be transformed before 
 * returning to the frontend
 */
export const getEvents: RequestHandler = async (req: Request, res: Response) => {
  console.log("📥 getEvents hit");

  const { data, error } = await supabase.from("CalenderEvents").select('*');

  if (error) {
    console.error("❌ Supabase error:", error.message, error.details);
    res.status(500).json({ error: error.message, details: error.details });
    return;
  }

  console.log("✅ Supabase data:", data);
  res.json(data);
};

// .select() is needed to return the newly created task
export const createEvent: RequestHandler = async (req: Request, res: Response) => {
  const { 
    classTypeName,
    DayOfWeek,
    StartTime,
    EndTime,
    instructor,
    RecurStartDate,
    RecurEndDate
   } = req.body;
  const { data, error } = await supabase.from('CalendarEvents').insert([{ classTypeName,
    DayOfWeek,
    StartTime,
    EndTime,
    instructor,
    RecurStartDate,
    RecurEndDate }]).select();

  //console.log('REQ BODY:', title);
  //console.log('INSERT response:', data);
  //console.log('INSERT error:', error);
  if (error) {
    res.status(500).json(error);
    return;
  }
  res.json(data?.[0]);
};

// .select() is needed to return the updated task 
export const updateEvent: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { 
    classTypeName,
    DayOfWeek,
    StartTime,
    EndTime,
    instructor,
    RecurStartDate,
    RecurEndDate
   } = req.body;
  const { data, error } = await supabase.from('CalendarEvents').update({ classTypeName,
    DayOfWeek,
    StartTime,
    EndTime,
    instructor,
    RecurStartDate,
    RecurEndDate }).eq('id', id).select();
  if (error) {
    res.status(500).json(error);
    return;
  }
  res.json(data);
};

export const deleteEvent: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('CalendarEvents').delete().eq('id', id);
  if (error) {
    res.status(500).json(error);
    return;
  }
  res.json(data);
};

