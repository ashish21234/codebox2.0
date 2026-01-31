import { db } from "@/config/db";
import { CompletedExerciseTable, CourseChaptersTable, CourseTable, EnrollCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url);
    const courseid = searchParams.get('courseid');
    const user=await currentUser();
    if(courseid){
        const courseIdNum = Number(courseid);
        const result = await db.select().from(CourseTable).where(eq(CourseTable.courseId, courseIdNum));
        
        const chapterResult = await db.select().from(CourseChaptersTable)
            .where(eq(CourseChaptersTable.courseId, courseIdNum));
        const enrolledCourse= await db.select().from(EnrollCourseTable)
        //@ts-ignore
        .where(and(eq(EnrollCourseTable.courseId, courseIdNum), eq(EnrollCourseTable.userId,user?.primaryEmailAddress?.emailAddress)))
        const isEnrolledCourse=enrolledCourse?.length>0?true:false;

        const completedExercises=await db.select().from(CompletedExerciseTable)
        //@ts-ignore
        .where(and(eq(CompletedExerciseTable.courseId, courseIdNum), eq(CompletedExerciseTable.userId,user?.primaryEmailAddress?.emailAddress)) )
        .orderBy(desc(CompletedExerciseTable?.courseId),desc(CompletedExerciseTable?.exerciseId))


        return NextResponse.json({
            ...result[0],
            chapters: chapterResult,
            userEnrolled:isEnrolledCourse,
            courseEnrolledInfo:enrolledCourse[0],
            completedExercises:completedExercises
        });
    }
    else{
        const result = await db.select().from(CourseTable);
        return NextResponse.json(result);
    }
}