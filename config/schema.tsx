import { integer, json, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  points: integer().default(0),
  subscription: varchar(),
  streak: integer().default(0),
  lastExerciseDate: varchar()
});
export const CourseTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  courseId: integer().notNull().unique(),
  title: varchar().notNull(),
  desc: varchar().notNull(),
  bannerImage: varchar().notNull(),
  level: varchar().default('Beginner'),
  tags: varchar(),
  editorType: varchar()
})

export const CourseChaptersTable = pgTable('courseChapters', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  chapterId: integer(),
  courseId: integer().notNull(),
  name: varchar(),
  desc: varchar(),
  exercises: json(),

})


export const EnrollCourseTable = pgTable('enrollCourse', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar(),
  courseId: integer(),
  enrolledDate: timestamp().defaultNow(),
  xpEarned: integer()

})


export const CompletedExerciseTable = pgTable('completedExercise', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  courseId: integer(),
  chapterId: integer(),
  exerciseId: varchar(),
  userId: varchar(),

})

export const ExerciseTable = pgTable('exercise', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  courseId: integer(),
  chapterId: integer(),
  exerciseId: varchar(),
  exerciseContent: json(),
  exerciseName: varchar()
})


export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  subject: varchar('subject', { length: 200 }).notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const projectsTable = pgTable("projects", {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').notNull(),
  title: varchar('title').notNull().default("Untitled Project"),
  description: text('description'),
  files: json('files').notNull(),
  private: integer('private').default(0), // 0 for public, 1 for private
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});