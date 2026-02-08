import { db } from "@/config/db";
import { CompletedExerciseTable, CourseChaptersTable, CourseTable, EnrollCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url);
    const courseid = searchParams.get('courseid');
    const user=await currentUser();
    const userEmail=user?.primaryEmailAddress?.emailAddress;
    if(!userEmail){
        return NextResponse.json({error:"User not authenticated"},{status:401});
    }
    if(courseid && courseid!=='enrolled'){
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
    else if(courseid=='enrolled'){
         // 1️⃣ Fetch all enrolled courses for the user
const enrolledCourses = await db
  .select()
  .from(EnrollCourseTable)
  .where(eq(EnrollCourseTable.userId, userEmail));

if (enrolledCourses.length === 0) {
  return NextResponse.json([]);
}

// Extract courseIds (filter out null for inArray typing)
const courseIds = enrolledCourses.map(c => c.courseId).filter((id): id is number => id != null);

// 2️⃣ Fetch all course details in one go
const courses = await db
  .select()
  .from(CourseTable)
  .where(inArray(CourseTable.courseId, courseIds));

// 3️⃣ Fetch chapters for all courses
const chapters = await db
  .select()
  .from(CourseChaptersTable)
  .where(inArray(CourseChaptersTable.courseId, courseIds))
  .orderBy(asc(CourseChaptersTable.chapterId));

// 4️⃣ Fetch completed exercises for all courses
const completed = await db
  .select()
  .from(CompletedExerciseTable)
  .where(
    and(
      inArray(CompletedExerciseTable.courseId, courseIds),
      eq(CompletedExerciseTable.userId, userEmail)
    )
  )
  .orderBy(
    desc(CompletedExerciseTable.courseId),
    desc(CompletedExerciseTable.exerciseId)
  );

// 5️⃣ Combine everything
const finalResult = courses.map(course => {
  const courseEnrollInfo = enrolledCourses.find(
    e => e.courseId === course.courseId
  );

  return {
    ...course,
    chapters: chapters.filter(ch => ch.courseId === course.courseId),
    completedExercises: completed.filter(
      cx => cx.courseId === course.courseId
    ),
    courseEnrolledInfo: courseEnrollInfo,
    userEnrolled: true
  };
});

// 6️⃣ Format output
const formattedResult = finalResult.map(item => {
  // Count total exercises by summing exercises arrays in all chapters
  const totalExercises = item.chapters.reduce((acc, chapter) => {
    const exercisesCount = Array.isArray(chapter.exercises)
      ? chapter.exercises.length
      : 0;
    return acc + exercisesCount;
  }, 0);

  const completedExercises = item.completedExercises.length;

  return {
    courseId: item.courseId,
    title: item.title,
    bannerImage: item.bannerImage,
    totalExercises,
    completedExercises,
    xpEarned: item.courseEnrolledInfo?.xpEarned || 0,
    level: item.level
  };
});

return NextResponse.json(formattedResult);

    }
    else{
        const result = await db.select().from(CourseTable);
        return NextResponse.json(result);
    }
}
