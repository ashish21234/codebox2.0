import { db } from "@/config/db";
import { projectsTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const user = await currentUser();
    const { title, description } = await req.json();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.insert(projectsTable).values({
        userId: user.id, // Using Clerk ID
        title: title || "Untitled Project",
        description: description || "",
        files: {
            "/App.js": {
                code: `export default function App() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Hello CodeBox Project!</h1>
      <p>Start editing to see some magic happen!</p>
    </div>
  );
}
`
            },
            "/index.js": {
                code: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`
            },
            "/styles.css": {
                code: `body {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`
            },
            "/public/index.html": {
                code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CodeBox App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
            }
        },
    }).returning();

    return NextResponse.json(result[0]);
}

export async function GET(req: NextRequest) {
    const user = await currentUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db
        .select()
        .from(projectsTable)
        .where(eq(projectsTable.userId, user.id))
        .orderBy(desc(projectsTable.createdAt));

    return NextResponse.json(result);
}
