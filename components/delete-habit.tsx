"use client"

import { deleteHabit } from "@/app/action/action"


export default function DeleteHabit({habit_id}:{habit_id: string}){

  async function handleDelete(){
    console.log(habit_id)
    deleteHabit(habit_id)
    
  }

  return(
    <span className="pointer text-sm text-red-400" onClick={handleDelete}>delete</span>
  )
}