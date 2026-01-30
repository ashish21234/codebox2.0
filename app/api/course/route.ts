import { db } from "@/config/db";
import { CourseChaptersTable, CourseTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url);
    const courseid = searchParams.get('courseid');
    
    if(courseid){
        const courseIdNum = Number(courseid);
        const result = await db.select().from(CourseTable).where(eq(CourseTable.courseId, courseIdNum));
        
        const chapterResult = await db.select().from(CourseChaptersTable)
            .where(eq(CourseChaptersTable.courseId, courseIdNum));
        
        return NextResponse.json({
            ...result[0],
            chapters: chapterResult
        });
    }
    else{
        const result = await db.select().from(CourseTable);
        return NextResponse.json(result);
    }
}