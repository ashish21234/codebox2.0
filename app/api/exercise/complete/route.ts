import { db } from "@/config/db";
import { CompletedExerciseTable, EnrollCourseTable, usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { courseId, chapterId, exerciseId, xpEarned } = await req.json();
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  
  if (!userEmail) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }
  
  const result = await db.insert(CompletedExerciseTable).values({
    chapterId: chapterId,
    courseId: courseId,
    exerciseId: exerciseId,
    userId: userEmail
  }).returning();
  
  await db.update(EnrollCourseTable).set({
    xpEarned: sql`${EnrollCourseTable.xpEarned} + ${xpEarned}`
  }).where(eq(EnrollCourseTable.courseId, courseId));
  
  // Streak Logic
  const userData = await db.select().from(usersTable).where(eq(usersTable.email, userEmail));
  const currentUserData = userData[0];
  const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-CA');

  let newStreak = currentUserData.streak || 0;

  if (currentUserData.lastExerciseDate === yesterday) {
    newStreak += 1;
  } else if (currentUserData.lastExerciseDate !== today) {
    newStreak = 1;
  }

  await db.update(usersTable).set({
    points: sql`${usersTable.points} + ${xpEarned}`,
    streak: newStreak,
    lastExerciseDate: today
  }).where(eq(usersTable.email, userEmail));
  
  return NextResponse.json({ result });
}
