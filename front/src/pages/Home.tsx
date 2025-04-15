import { AddTaskDialog } from "@/components/add-task-dialog";
import { TasksList } from "@/components/tasks-list";
import { Button } from "@/components/ui/button";
import { useTasksQuery } from "@/hooks/queries/tasks";
import { useAuth } from "@/hooks/use-auth";
import { Task } from "@/lib/types";
import { PlusSquareIcon } from "lucide-react";
import { toast } from "sonner";

export const Home = () => {
  const { user } = useAuth();

  const { data, isLoading, isError, error } = useTasksQuery();

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError && error) {
    toast.error("Error", {
      description:
        error.message || "Something went wrong while getting the tasks, Please try again later!",
    });
    return <p>Error...</p>;
  }

  const tasks: Task[] = data.tasks;

  const tasksCount = tasks.filter((task) => task.status === "in_progress").length;

  return (
    <>
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">
          Welcome,{" "}
          <span className="text-primary capitalize">{user?.first_name ?? user?.last_name}</span>.
        </h1>
        <TasksCountMessage tasksCount={tasksCount} />
      </section>
      <div className="mt-8">
        <TasksList tasks={data.tasks} />
      </div>
      {user?.role === "admin" && (
        <AddTaskDialog>
          <Button variant={"ghost"} className="mt-8 text-muted-foreground" size={"lg"}>
            <PlusSquareIcon className="size-5 ml-2" />
            Add a new task...
          </Button>
        </AddTaskDialog>
      )}
    </>
  );
};

const TasksCountMessage = ({ tasksCount }: { tasksCount: number }) => {
  const { user } = useAuth();

  if (user?.role === "admin") {
    return (
      <p className="text-muted-foreground">
        Your team got {tasksCount} <span>{tasksCount === 1 ? "task" : "tasks"} to do.</span>{" "}
      </p>
    );
  }

  return (
    <p className="text-muted-foreground">
      You've got {tasksCount} <span>{tasksCount === 1 ? "task" : "tasks"} to do.</span>{" "}
    </p>
  );
};
