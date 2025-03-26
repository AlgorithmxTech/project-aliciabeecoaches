import { registerService } from "@/services/auth.services";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const user = await registerService(data);

    return NextResponse.json(
      { message: "User created successfully!", user },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 400 }
    );
  }
}
