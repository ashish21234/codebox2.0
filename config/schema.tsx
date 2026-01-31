
import { integer,  json,  PgTable,  pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  points: integer().default(0),
  subscription: varchar()
});
export const CourseTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  courseId: integer().notNull().unique(),
  title: varchar().notNull(),
  desc: varchar().notNull(),
  bannerImage: varchar().notNull(),
  level:varchar().default('Beginner'),
  tags: varchar()


})

export const CourseChaptersTable = pgTable('courseChapters',{
  id:integer().primaryKey().generatedAlwaysAsIdentity(),
  chapterId:integer(),
  courseId:integer().notNull(),
  name: varchar(),
  desc: varchar(),
  exercises: json(),

})


export const EnrollCourseTable=pgTable('enrollCourse',{
  id:integer().primaryKey().generatedAlwaysAsIdentity(),
  userId:varchar(),
  courseId:integer(),
  enrolledDate:timestamp().defaultNow(),
  xpEarned:integer()

})


export const CompletedExerciseTable=pgTable('completedExercise',{
  id:integer().primaryKey().generatedAlwaysAsIdentity(),
  courseId:integer(),
  chapterId:integer(),
  exerciseId:integer(),
  userId:varchar(),
  
})