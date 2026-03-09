import { db } from "@/config/db";
import {
  CompletedExerciseTable,
  CourseChaptersTable,
  ExerciseTable,
  CourseTable,
} from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { courseId, chapterId, exerciseId } = await req.json();

    // Validate and parse inputs
    const courseIdNum = Number(courseId);
    const chapterIdNum = Number(chapterId);

    if (isNaN(courseIdNum) || isNaN(chapterIdNum)) {
      return NextResponse.json({
        error: "Invalid courseId or chapterId",
        details: { courseId, chapterId }
      }, { status: 400 });
    }

    /* ---------- CURRENT CHAPTER ---------- */
    const courseResult = await db
      .select()
      .from(CourseChaptersTable)
      .where(
        and(
          eq(CourseChaptersTable.courseId, courseIdNum),
          eq(CourseChaptersTable.chapterId, chapterIdNum)
        )
      );

    if (!courseResult.length) {
      return NextResponse.json({
        error: "Invalid chapter",
        details: { courseId: courseIdNum, chapterId: chapterIdNum }
      }, { status: 400 });
    }

    const currentChapter = courseResult[0];
    const currentExercises = (currentChapter.exercises as any[]) ?? [];

    // Verify the exercise exists in the chapter (checking slugs)
    // The frontend sends the slug as exerciseId.
    const exerciseExists = currentExercises.some((e: any) => e.slug === exerciseId);

    if (!exerciseExists) {
      return NextResponse.json({
        error: "Exercise not found in chapter JSON",
        details: { exerciseId, chapterExercises: currentExercises.map((e: any) => e.slug) }
      }, { status: 404 });
    }

    /* ---------- CURRENT EXERCISE DATA ---------- */
    // Use exerciseId directly as it matches the slug in the DB
    const exerciseResult = await db
      .select()
      .from(ExerciseTable)
      .where(
        and(
          eq(ExerciseTable.courseId, courseIdNum),
          eq(ExerciseTable.exerciseId, exerciseId),
          eq(ExerciseTable.chapterId, chapterIdNum)
        )
      );

    if (!exerciseResult.length) {
      return NextResponse.json(
        {
          error: "Exercise does not belong to this chapter (DB Mismatch)",
          details: { courseId: courseIdNum, chapterId: chapterIdNum, exerciseId }
        },
        { status: 400 }
      );
    }

    const exerciseData = exerciseResult[0];

    /* ---------- NEXT/PREV CHAPTER ---------- */
    const nextcourseResult = await db
      .select()
      .from(CourseChaptersTable)
      .where(
        and(
          eq(CourseChaptersTable.courseId, courseIdNum),
          eq(CourseChaptersTable.chapterId, chapterIdNum + 1)
        )
      );

    const nextChapter = nextcourseResult[0];

    const prevcourseResult = await db
      .select()
      .from(CourseChaptersTable)
      .where(
        and(
          eq(CourseChaptersTable.courseId, courseIdNum),
          eq(CourseChaptersTable.chapterId, chapterIdNum - 1)
        )
      );

    const prevChapter = prevcourseResult[0];


    /* ---------- COMPLETED ---------- */
    const completedExercise = await db
      .select()
      .from(CompletedExerciseTable)
      .where(
        and(
          eq(CompletedExerciseTable.courseId, courseIdNum),
          eq(CompletedExerciseTable.chapterId, chapterIdNum),
          eq(CompletedExerciseTable.exerciseId, exerciseId)
        )
      );


    /* ---------- COURSE DETAILS ---------- */
    const courseDetails = await db
      .select({
        name: CourseTable.title,
        desc: CourseTable.desc,
        editorType: CourseTable.editorType
      })
      .from(CourseTable)
      .where(eq(CourseTable.courseId, courseIdNum));

    /* ---------- RESPONSE ---------- */
    return NextResponse.json({
      chapterId: currentChapter.chapterId,
      courseId: currentChapter.courseId,
      name: currentChapter.name,
      desc: currentChapter.desc,
      editorType: courseDetails[0]?.editorType || "static",

      exercises: currentExercises,

      nextChapter: nextChapter
        ? {
          chapterId: nextChapter.chapterId,
          exercises: nextChapter.exercises ?? [],
        }
        : undefined,

      prevChapter: prevChapter
        ? {
          chapterId: prevChapter.chapterId,
          exercises: prevChapter.exercises ?? [],
        }
        : undefined,

      exerciseData: {
        chapterId: exerciseData.chapterId,
        courseId: exerciseData.courseId,
        exerciseId: exerciseData.exerciseId,
        exerciseName: exerciseData.exerciseName,
        exerciseContent:
          typeof exerciseData.exerciseContent === "string"
            ? JSON.parse(exerciseData.exerciseContent)
            : exerciseData.exerciseContent,
      },

      completedExercise,
    });
  } catch (error: any) {
    console.error("API Error detailed:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
