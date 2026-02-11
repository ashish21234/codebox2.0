import { db } from "@/config/db";
import {
  CompletedExerciseTable,
  CourseChaptersTable,
  ExerciseTable,
} from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { courseId, chapterId, exerciseId } = await req.json();

  /* ---------- CURRENT CHAPTER ---------- */
  const courseResult = await db
    .select()
    .from(CourseChaptersTable)
    .where(
      and(
        eq(CourseChaptersTable.courseId, courseId),
        eq(CourseChaptersTable.chapterId, chapterId)
      )
    );

  if (!courseResult.length) {
    return NextResponse.json({ error: "Invalid chapter" }, { status: 400 });
  }

  const currentChapter = courseResult[0];
  const currentExercises = currentChapter.exercises ?? [];

  /* ---------- NEXT CHAPTER ---------- */
  const nextcourseResult = await db
    .select()
    .from(CourseChaptersTable)
    .where(
      and(
        eq(CourseChaptersTable.courseId, courseId),
        eq(CourseChaptersTable.chapterId, Number(chapterId) + 1)
      )
    );

  const nextChapter = nextcourseResult[0];

  /* ---------- PREVIOUS CHAPTER ---------- */
  const prevcourseResult = await db
    .select()
    .from(CourseChaptersTable)
    .where(
      and(
        eq(CourseChaptersTable.courseId, courseId),
        eq(CourseChaptersTable.chapterId, Number(chapterId) - 1)
      )
    );

  const prevChapter = prevcourseResult[0];

  /* ---------- CURRENT EXERCISE DATA ---------- */
  const exerciseResult = await db
    .select()
    .from(ExerciseTable)
    .where(
      and(
        eq(ExerciseTable.courseId, courseId),
        eq(ExerciseTable.exerciseId, exerciseId),
        eq(ExerciseTable.chapterId, chapterId) // ⭐ IMPORTANT
      )
    );

  if (!exerciseResult.length) {
    return NextResponse.json(
      { error: "Exercise does not belong to this chapter" },
      { status: 400 }
    );
  }

  const exerciseData = exerciseResult[0];

  /* ---------- COMPLETED ---------- */
  const completedExercise = await db
    .select()
    .from(CompletedExerciseTable)
    .where(
      and(
        eq(CompletedExerciseTable.courseId, courseId),
        eq(CompletedExerciseTable.chapterId, chapterId)
      )
    );

  /* ---------- RESPONSE ---------- */
  return NextResponse.json({
    chapterId: currentChapter.chapterId,
    courseId: currentChapter.courseId,
    name: currentChapter.name,
    desc: currentChapter.desc,

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
}
