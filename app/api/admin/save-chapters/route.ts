import { db } from "@/config/db";
import { CourseChaptersTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";

const DATA = [
  {
    id: 1,
    name: "Introduction to Python",
    desc: "Learn what Python is and why it is one of the most popular programming languages.",
    exercises: [
      { name: "What is Python?", slug: "what-is-python", xp: 15, difficulty: "easy" },
      { name: "Why Python?", slug: "why-python", xp: 15, difficulty: "easy" },
      { name: "Install Python", slug: "install-python", xp: 20, difficulty: "easy" },
      { name: "Run Your First Program", slug: "run-first-program", xp: 25, difficulty: "easy" },
      { name: "Python vs Other Languages", slug: "python-vs-languages", xp: 20, difficulty: "easy" },
    ],
  },
  {
    id: 2,
    name: "Variables & Data Types",
    desc: "Understand variables and different data types in Python.",
    exercises: [
      { name: "Creating Variables", slug: "creating-variables", xp: 20, difficulty: "easy" },
      { name: "Numbers & Strings", slug: "numbers-strings", xp: 20, difficulty: "easy" },
      { name: "Type Checking", slug: "type-checking", xp: 15, difficulty: "easy" },
      { name: "Type Conversion", slug: "type-conversion", xp: 25, difficulty: "easy" },
      { name: "Input from User", slug: "input-from-user", xp: 25, difficulty: "easy" },
    ],
  },
  {
    id: 3,
    name: "Operators",
    desc: "Work with arithmetic, comparison, and logical operators.",
    exercises: [
      { name: "Arithmetic Operators", slug: "arithmetic-operators", xp: 20, difficulty: "easy" },
      { name: "Comparison Operators", slug: "comparison-operators", xp: 20, difficulty: "easy" },
      { name: "Logical Operators", slug: "logical-operators", xp: 25, difficulty: "easy" },
      { name: "Assignment Operators", slug: "assignment-operators", xp: 15, difficulty: "easy" },
    ],
  },
  {
    id: 4,
    name: "Conditional Statements",
    desc: "Control program flow using conditions.",
    exercises: [
      { name: "If Statement", slug: "if-statement", xp: 20, difficulty: "easy" },
      { name: "If Else", slug: "if-else", xp: 20, difficulty: "easy" },
      { name: "Elif Ladder", slug: "elif-ladder", xp: 25, difficulty: "easy" },
      { name: "Nested Conditions", slug: "nested-conditions", xp: 30, difficulty: "medium" },
    ],
  },
  {
    id: 5,
    name: "Loops",
    desc: "Repeat tasks efficiently using loops.",
    exercises: [
      { name: "For Loop", slug: "for-loop", xp: 20, difficulty: "easy" },
      { name: "While Loop", slug: "while-loop", xp: 20, difficulty: "easy" },
      { name: "Break & Continue", slug: "break-continue", xp: 25, difficulty: "easy" },
      { name: "Loop Patterns", slug: "loop-patterns", xp: 35, difficulty: "medium" },
    ],
  },
  {
    id: 6,
    name: "Functions",
    desc: "Write reusable blocks of code using functions.",
    exercises: [
      { name: "Define a Function", slug: "define-function", xp: 25, difficulty: "easy" },
      { name: "Function Parameters", slug: "function-parameters", xp: 25, difficulty: "easy" },
      { name: "Return Values", slug: "return-values", xp: 20, difficulty: "easy" },
      { name: "Function Practice", slug: "function-practice", xp: 35, difficulty: "medium" },
    ],
  },
  {
    id: 7,
    name: "Lists & Tuples",
    desc: "Store and manage collections of data.",
    exercises: [
      { name: "List Basics", slug: "list-basics", xp: 20, difficulty: "easy" },
      { name: "List Methods", slug: "list-methods", xp: 25, difficulty: "easy" },
      { name: "Tuple Basics", slug: "tuple-basics", xp: 20, difficulty: "easy" },
      { name: "List vs Tuple", slug: "list-vs-tuple", xp: 20, difficulty: "easy" },
    ],
  },
  {
    id: 8,
    name: "Dictionaries & Sets",
    desc: "Work with key-value pairs and unique collections.",
    exercises: [
      { name: "Dictionary Basics", slug: "dictionary-basics", xp: 25, difficulty: "easy" },
      { name: "Dictionary Operations", slug: "dictionary-operations", xp: 30, difficulty: "medium" },
      { name: "Set Basics", slug: "set-basics", xp: 20, difficulty: "easy" },
      { name: "Set Operations", slug: "set-operations", xp: 30, difficulty: "medium" },
    ],
  },
  {
    id: 9,
    name: "Strings",
    desc: "Manipulate and process text data.",
    exercises: [
      { name: "String Indexing", slug: "string-indexing", xp: 20, difficulty: "easy" },
      { name: "String Methods", slug: "string-methods", xp: 25, difficulty: "easy" },
      { name: "String Formatting", slug: "string-formatting", xp: 30, difficulty: "medium" },
      { name: "String Practice", slug: "string-practice", xp: 35, difficulty: "medium" },
    ],
  },
  {
    id: 10,
    name: "Basic File Handling",
    desc: "Read from and write to files in Python.",
    exercises: [
      { name: "Read a File", slug: "read-a-file", xp: 25, difficulty: "easy" },
      { name: "Write to a File", slug: "write-to-a-file", xp: 25, difficulty: "easy" },
      { name: "Append to File", slug: "append-to-file", xp: 20, difficulty: "easy" },
      { name: "File Handling Practice", slug: "file-handling-practice", xp: 35, difficulty: "medium" },
    ],
  },
];

export async function GET(req: NextRequest) {
  for (const item of DATA) {
    await db.insert(CourseChaptersTable).values({
      courseId: 4, // Python Beginner
      chapterId: item.id,
      name: item.name,
      desc: item.desc,
      exercises: item.exercises,
    });
  }

  return NextResponse.json({ success: true });
}
