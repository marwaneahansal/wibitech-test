import { AddTaskDialog } from "@/components/add-task-dialog";
import { LoadingSpinner } from "@/components/loading-spinner";
import { TasksList } from "@/components/tasks-list";
import { TasksPagination } from "@/components/tasks-pagination";
import { Button } from "@/components/ui/button";
import { useTasksQuery } from "@/hooks/queries/tasks";
import { useAuth } from "@/hooks/use-auth";
import { Task } from "@/lib/types";
import { PlusSquareIcon } from "lucide-react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

export const Home = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";

  const { data, isLoading, isError, error } = useTasksQuery({ page: parseInt(page) });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError && error) {
    toast.error("Error", {
      description:
        error.message || "Something went wrong while getting the tasks, Please try again later!",
    });
    return <p>Error...</p>;
  }

  const tasks: Task[] = data.tasks.data;

  const tasksCount = data.tasks_in_progress_count;

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
        <TasksList tasks={tasks} />
      </div>
      <div className="flex items-center justify-between mt-8">
        {user?.role === "admin" && (
          <AddTaskDialog>
            <Button variant={"ghost"} className="text-muted-foreground" size={"lg"}>
              <PlusSquareIcon className="size-5 ml-2" />
              Add a new task...
            </Button>
          </AddTaskDialog>
        )}
        <TasksPagination currentPage={data.tasks.current_page} totalPages={data.tasks.total} />
      </div>
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
