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
import { createClient } from "@/lib/supabase/server"
export default async function Page() {
  const supabase = await createClient()
  const { data: habits } = await supabase.from('habits').select()

  const yourHabit = habits?.map((habit) => (
    <li key={habit.id}>{habit.habit_name}</li>
  ))

  return (<section>
    <h1>Your Habit</h1>
    <ul className="list-decimal">
      {yourHabit}
    </ul>
  </section>)
}