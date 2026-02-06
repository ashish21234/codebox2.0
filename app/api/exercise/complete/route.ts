import EnrolledCourses from "@/app/_components/EnrolledCourses";
import { db } from "@/config/db";
import { CompletedExerciseTable, EnrollCourseTable, usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
const {courseId,chapterId,exerciseId,xpEarned} = await req.json();
const user=await currentUser();
const result = await db.insert(CompletedExerciseTable).values({
    chapterId:chapterId,
    courseId:courseId,
    exerciseId:exerciseId,
    userId:user?.primaryEmailAddress?.emailAddress
}).returning();
await db.update(EnrollCourseTable).set({
    xpEarned:sql`${EnrollCourseTable.xpEarned} + ${xpEarned}`
}).where(eq(EnrollCourseTable?.courseId,courseId));
await db.update(usersTable).set({
    points:sql`${usersTable.points} + ${xpEarned}`
})
//@ts-ignore
.where(eq(usersTable.email,user?.primaryEmailAddress?.emailAddress))
return NextResponse.json({result});

}
