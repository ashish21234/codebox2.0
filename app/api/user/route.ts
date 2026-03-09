import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    const user=await currentUser();
    //if user already exists?
    const users=await db.select().from(usersTable)
    //@ts-ignore
    .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));
    if(users?.length <= 0) {
    const newUser={
        name:user?.fullName??' ',
        email:user?.primaryEmailAddress?.emailAddress??' ',
        points:0,
        streak: 0
    }
    const result=await db.insert(usersTable).values(newUser).returning();
    return NextResponse.json(result[0]);
    }

    const currentUserData = users[0];
    const today = new Date().toLocaleDateString('en-CA');
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-CA');

    if (currentUserData.lastExerciseDate && 
        currentUserData.lastExerciseDate !== today && 
        currentUserData.lastExerciseDate !== yesterday) {
        
        await db.update(usersTable).set({
            streak: 0
        }).where(eq(usersTable.email, currentUserData.email));
        
        currentUserData.streak = 0;
    }

    return NextResponse.json(currentUserData);
}