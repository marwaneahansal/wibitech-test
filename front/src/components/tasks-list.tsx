import { Button } from "./ui/button";
import { Check, CheckCircleIcon, PenIcon, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Task } from "@/lib/types";
import { useAuth } from "@/hooks/use-auth";

type TasksListProps = {
  tasks: Task[];
};

export const TasksList = ({ tasks }: TasksListProps) => {
  const { user } = useAuth();

  if (tasks.length === 0) {
    if (user?.role === "admin")
      return (
        <p className="text-lg text-center">
          Your team got no task currently! start by adding them.
        </p>
      );

    return <p className="text-lg text-center">You've got no task currently assigned to you!</p>;
  }

  return (
    <>
      <div className="space-y-6">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </>
  );
};

const TaskCard = ({ task }: { task: Task }) => {
  const { user } = useAuth();

  return (
    <div className="px-6 py-4 bg-gray-100 flex items-center justify-between rounded-2xl group">
      <div className="space-y-1 flex items-center gap-x-4">
        {task.status === "done" && <Check className="text-blue-500 size-6" />}
        <div>
          {user?.role === "admin" && (
            <p className="text-blue-500 text-sm font-medium">@{task.user.username}</p>
          )}
          <p className={cn("text-lg font-semibold", task.status === "done" && "line-through")}>
            {task.title}
          </p>
          <p
            className={cn(
              "text-muted-foreground overflow-ellipsis text-sm",
              task.status === "done" && "line-through"
            )}
          >
            {task.description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 group-hover:visible invisible transition duration-500 ease-in-out">
        {task.status === "in_progress" && (
          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:text-blue-500 hover:bg-blue-500/10"
          >
            <PenIcon className="h-4 w-4" />
          </Button>
        )}

        {user?.role === "admin" && (
          <Button
            size={"icon"}
            variant={"ghost"}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}

        {task.status === "in_progress" && (
          <Button>
            <CheckCircleIcon className="h-4 w-4 ml-1" />
            Done
          </Button>
        )}
      </div>
    </div>
  );
};
