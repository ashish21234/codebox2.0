import "dotenv/config";
import { db } from "./config/db";
import { CourseTable } from "./config/schema";
import { eq } from "drizzle-orm";

async function run() {
    console.log("Checking Course 4...");
    const courseBefore = await db.select().from(CourseTable).where(eq(CourseTable.courseId, 4));
    console.log("Current Data:", courseBefore);

    if (courseBefore.length > 0) {
        console.log("Updating editorType to 'python'...");
        await db.update(CourseTable)
            .set({ editorType: 'python' })
            .where(eq(CourseTable.courseId, 4));

        const courseAfter = await db.select().from(CourseTable).where(eq(CourseTable.courseId, 4));
        console.log("Updated Data:", courseAfter);
    } else {
        console.log("Course 4 not found!");
    }
}

run();
