"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Terminal } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

type Project = {
    id: number;
    title: string;
    description: string;
    files: any;
    createdAt: string;
};

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const router = useRouter();
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            GetProjects();
        }
    }, [user]);

    const GetProjects = async () => {
        setLoading(true);
        try {
            const result = await axios.get("/api/projects");
            setProjects(result.data);
        } catch (error) {
            toast.error("Failed to load projects");
        } finally {
            setLoading(false);
        }
    };

    const CreateProject = async () => {
        setCreating(true);
        try {
            const result = await axios.post("/api/projects", {
                title: "Untitled Project " + (projects.length + 1),
            });
            toast.success("Project created successfully!");
            router.push("/projects/" + result.data.id);
        } catch (error) {
            toast.error("Failed to create project");
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="p-10 md:px-20 lg:px-36 xl:px-48">
            <div className="flex justify-between items-center mb-8">
                <h2 className="font-game text-4xl font-bold flex gap-3 items-center">
                    <Terminal size={40} /> My Projects
                </h2>
                <Button
                    onClick={CreateProject}
                    disabled={creating}
                    size="lg"
                    variant="pixel"
                >
                    {creating ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2" />}
                    New Project
                </Button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-40 w-full rounded-xl" />
                    ))}
                </div>
            ) : projects.length === 0 ? (
                <div className="text-center py-20 bg-muted/20 rounded-xl border-2 border-dashed">
                    <h3 className="text-2xl font-game text-muted-foreground mb-4">No projects yet!</h3>
                    <p className="mb-6">Start coding your first masterpiece.</p>
                    <Button onClick={CreateProject} variant="outline">Create One Now</Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Link href={"/projects/" + project.id} key={project.id}>
                            <div className="border rounded-xl p-5 hover:border-primary cursor-pointer hover:shadow-lg transition-all bg-card/50 backdrop-blur-sm h-full flex flex-col justify-between group">
                                <div>
                                    <div className="h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-colors">
                                        <Terminal size={40} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <h3 className="font-game text-xl font-bold mb-2 truncate">{project.title}</h3>
                                    <p className="text-muted-foreground text-sm line-clamp-2">
                                        {project.description || "No description provided."}
                                    </p>
                                </div>
                                <div className="mt-4 text-xs text-muted-foreground pt-4 border-t flex justify-between items-center">
                                    <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
