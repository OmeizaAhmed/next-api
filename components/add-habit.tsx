"use client"

import { addNewHabit } from "@/app/action/action"
import { createClient } from "@/lib/supabase/client"
import { useActionState, useEffect, useState } from "react"

export default function AddHabit(){
  const [habitName, setHabitName] = useState("")
  const [habitType, setHabitType] = useState("boolean")
  const [ userId, setUserId ] = useState<null | string>()
  const [ updateDate, setUpdateDate ] = useState('')

  async function handleAddNewHabit(e: any){
    e.preventDefault();
    console.log({habitName, habitType, userId, updateDate})

    try{
      if(!habitName && !habitType && !userId) return 

      const newHabit = {
        user_id: userId!,
        habit_type: habitType,
        habit_name: habitName
      }
      addNewHabit(newHabit)


    }catch(error){

    }
    setHabitName('');

  }

  async function getUserId(){
    try {
        const supabase = createClient()        
        const { data, error } = await supabase.auth.getUser();
      
        if(error){
          console.error(error)
          throw new Error(error.message)
        }

      setUserId(data?.user?.id)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    getUserId()
    const date = new Date();
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
    setUpdateDate(dateString)
  }, [])

  


  return (
    <div>
      <form onSubmit={handleAddNewHabit} className="flex flex-col gap-5">

        <label htmlFor="habit-name">New Habit Name</label>
        <input type="text" id="habit-name" name="habit-name" className="border" onChange={(e) => setHabitName(e.target.value)} value={habitName}/>
       
        <div>
        <label htmlFor="habit-type">Habit Type</label>
        <select defaultValue={habitType} name="habit-type" id="habit-type" className="border" onChange={(e) => setHabitType(e.target.value)}>
          <option value="text">Text</option>
          <option value="boolean" id="boolean">Boolean</option>
          <option value="number">Number</option>
        </select>
        </div>
        <button className="py-1 px-2 rounded-lg bg-slate-950 text-white font-bold">Add new Habit</button>
      </form>
    </div>
  )
}