import { AddTaskDialog } from "@/components/add-task-dialog";
import { LoadingSpinner } from "@/components/loading-spinner";
import { TasksFilter } from "@/components/tasks-filter";
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
  const pageParam = searchParams.get("page") || "1";
  const searchQueryParam = searchParams.get("search") || "";
  const statusQueryParam = searchParams.get("status") || "";

  const { data, isLoading, isError, error } = useTasksQuery({
    page: parseInt(pageParam),
    searchQuery: searchQueryParam,
    statusQuery: statusQueryParam,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError && error) {
    toast.error("Error", {
      description:
        error.message || "Something went wrong while getting the tasks, Please try again later!",
    });
    return <p className="text-red-500">Error while getting tasks!</p>;
  }

  const tasks: Task[] = data.tasks.data;

  const tasksCount = data.tasks_in_progress_count;

  return (
    <>
      <section className="space-y-2">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="gap-y-2">
            <h1 className="text-2xl font-bold">
              Welcome,{" "}
              <span className="text-primary capitalize">{user?.first_name || user?.username}</span>.
            </h1>
            <TasksCountMessage tasksCount={tasksCount} />
          </div>
          <TasksFilter />
        </div>
      </section>
      <div className="mt-8">
        <TasksList tasks={tasks} />
      </div>
      <div className="flex flex-col-reverse lg:flex-row lg:items-center justify-between mt-8 gap-4">
        {user?.role === "admin" && (
          <AddTaskDialog>
            <Button variant={"ghost"} className="text-muted-foreground" size={"lg"}>
              <PlusSquareIcon className="size-5 ml-2" />
              Add a new task...
            </Button>
          </AddTaskDialog>
        )}
        <TasksPagination currentPage={data.tasks.current_page} totalPages={data.tasks.last_page} />
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
