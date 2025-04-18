import { Button } from "./ui/button";
import { Check, CheckCircleIcon, PenIcon, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { type Task } from "@/lib/types";
import { useUpdateTaskMutation } from "@/hooks/queries/tasks";
import { DeleteTaskDialog } from "./delete-task-dailog";
import { EditTaskDialog } from "./edit-task-dialog";

export const TaskCard = ({ task }: { task: Task }) => {
  const { user } = useAuth();

  const { mutation } = useUpdateTaskMutation();

  const markTaskAsDone = () => {
    mutation.mutate({
      id: task.id,
      status: "done",
    });
  };

  return (
    <div className="px-6 py-4 bg-gray-100 flex flex-col lg:flex-row lg:items-center justify-between rounded-2xl group gap-y-2 gap-x-6">
      <div className="space-y-1 flex items-center gap-x-4">
        {task.status === "done" && <Check className="text-primary size-6" />}
        <div>
          {user?.role === "admin" && (
            <p className="text-primary text-sm font-medium">@{task.user.username}</p>
          )}
          <p className={cn("text-lg font-semibold", task.status === "done" && "line-through")}>
            {task.title}
          </p>
          <p
            className={cn(
              "text-muted-foreground text-sm",
              task.status === "done" && "line-through"
            )}
          >
            {task.description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity self-end">
        {task.status === "in_progress" && (
          <EditTaskDialog task={task}>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="hover:text-primary hover:bg-blue-500/10"
            >
              <PenIcon className="h-4 w-4" />
            </Button>
          </EditTaskDialog>
        )}

        {user?.role === "admin" && (
          <DeleteTaskDialog taskId={task.id}>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </DeleteTaskDialog>
        )}

        {task.status === "in_progress" && (
          <Button onClick={markTaskAsDone}>
            <CheckCircleIcon className="h-4 w-4 ml-1" />
            Done
          </Button>
        )}
      </div>
    </div>
  );
};
