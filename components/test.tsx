// "use client"
// import { createClient } from "@/lib/supabase/client"
// import { useEffect, useState } from "react"
// export default async function Page() {
//   const [habit, setHabit] = useState<any>();

//   useEffect(() =>{
//     async function getHabits(){
//       const supabase = await createClient()
//       const { data: habitData , error} = await supabase.from('habit').select()
//       if(error){
//         setHabit(null)
//         return
//       }

//       setHabit(habitData)

//     }
//     getHabits()
//   }, [])

//   return <pre>{JSON.stringify(habit, null, 2)}</pre>
// }
import { getUserHabits } from "@/app/action/action"
import DeleteHabit from "./delete-habit"
export default async function Page() {
  const habits = await getUserHabits()

  const yourHabit = habits?.map((habit) => (
    <li key={habit.id}>{habit.habit_name} <DeleteHabit habit_id={habit.id}/></li>
  ))

  return (<section>
    <h1 className="font-semibold text-xl md:text-2xl">Your Habit</h1>

    <ul className="list-decimal">
    {yourHabit}
    </ul>
  </section>)
}