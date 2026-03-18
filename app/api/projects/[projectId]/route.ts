import { db } from "@/config/db";
import { projectsTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { projectId: string } }) {
    const user = await currentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const result = await db.select().from(projectsTable).where(
        and(
            eq(projectsTable.id, parseInt(params.projectId)),
            eq(projectsTable.userId, user.id)
        )
    );

    if (result.length === 0) return NextResponse.json({ error: "Project not found" }, { status: 404 });

    // Ensure files are parsed if stored as string, though Drizzle json usually handles it.
    // But wait, in POST I stringified it manually? Yes: JSON.stringify({...}).
    // So here it comes out as string?
    // Drizzle 'json' type automatically parses if driver supports it, or returns object.
    // Neon/Postgres driver usually returns object.
    // But let's check. IF I sent stringified, postgres stores JSON.
    // Let's assume it returns object. If it returns string I might need to parse.
    // However, I used JSON.stringify in POST.
    // Actually pg driver handles json/jsonb columns by parsing automatically.
    // But if I passed a string to .values(), it might store as string if column type is text?
    // No, column is json().
    // If I pass string to json column, it's valid JSON.
    // On retrieve, node-postgres parses it.
    // BUT I did `files: JSON.stringify({...})`.
    // If the column is `json`, I should pass an object directly to drizzle `.values()`.
    // If I passed a string, drizzle might double-stringify or pg might accept it.
    // Let's look at `route.ts`... `files: JSON.stringify({...})`.
    // If I used `json()` in schema, I should probably pass object.
    // Let's fix POST as well to pass object?
    // Or handle it here.

    return NextResponse.json(result[0]);
}

export async function PUT(req: NextRequest, { params }: { params: { projectId: string } }) {
    const user = await currentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { files, title } = await req.json();

    // If files is an object, Drizzle handles it.
    // I'll ensure files is passed as object.

    const updateData: any = { updatedAt: new Date() };
    if (files) updateData.files = files; // Pass object directly
    if (title) updateData.title = title;

    const result = await db.update(projectsTable)
        .set(updateData)
        .where(
            and(
                eq(projectsTable.id, parseInt(params.projectId)),
                eq(projectsTable.userId, user.id)
            )
        )
        .returning();

    return NextResponse.json(result[0]);
}
