import { TasksList } from "@/components/tasks-list";
import { Button } from "@/components/ui/button";
import { tasks } from "@/lib/data";
import { PlusSquareIcon } from "lucide-react";

export const Home = () => {
  const tasksCount = tasks.filter((task) => task.status === "in_progress").length;

  return (
    <>
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">
          Welcome, <span className="text-blue-500">Admin</span>.
        </h1>
        <p className="text-muted-foreground">
          Your team got {tasksCount} <span>{tasksCount === 1 ? "task" : "tasks"} to do.</span>{" "}
        </p>
      </section>
      <div className="mt-8">
        <TasksList tasks={tasks} />
      </div>
      <Button variant={"ghost"} className="mt-8 text-muted-foreground" size={"lg"}>
        <PlusSquareIcon className="size-5 ml-2" />
        Add a new task...
      </Button>
    </>
  );
};
