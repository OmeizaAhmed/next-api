"use server"
 import { createClient } from '@/lib/supabase/server'

 
 export async function addNewHabit(newHabit: {habit_name:string, habit_type:string, user_id:string}){
   try{
      const supabase = await createClient()
       const { error } = await supabase
     .from('habits')
     .insert(newHabit)
     if(error){
      throw new Error(error.message)
     }
    }catch(e){
      console.error(e)
    }
  }
  export async function getUserHabits(){
    const supabase = await createClient()
    const { data: habits } = await supabase.from('habits').select()
    return habits
  }

  export async function deleteHabit(habit_id: string){
    const supabase = await createClient()
       const { data, error } = await supabase
      .from('habits')
      .delete()
      .eq('id', habit_id)

  if(error) console.log(error)
  }

