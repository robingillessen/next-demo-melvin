import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Test de connectie door de auth status op te halen
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      return NextResponse.json({ 
        status: "error", 
        message: error.message 
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      status: "connected",
      message: "Supabase verbinding werkt!",
      hasSession: !!data.session
    });
  } catch (err) {
    return NextResponse.json({ 
      status: "error", 
      message: err instanceof Error ? err.message : "Onbekende fout"
    }, { status: 500 });
  }
}
