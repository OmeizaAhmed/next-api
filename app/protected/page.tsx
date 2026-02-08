import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import Page from "@/components/test";
import AddHabit from "@/components/add-habit";



export default async function ProtectedPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
        <Suspense>
          <div className="flex flex-col md:flex-row justify-between w-full">
          <Page />
          <AddHabit />
          </div>
        </Suspense>
  );
}
