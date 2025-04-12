import { type Task } from "@/lib/data";
import { Button } from "./ui/button";
import { Check, CheckCircleIcon, PenIcon, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type TasksListProps = {
  tasks: Task[];
};

export const TasksList = ({ tasks }: TasksListProps) => {
  if (tasks.length === 0) {
    return <p className="text-lg text-center">You've got no task! start adding them.</p>;
  }

  return (
    <>
      <div className="space-y-6">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </>
  );
};

const Task = ({ task }: { task: Task }) => {
  return (
    <div className="px-4 py-2.5 bg-gray-100 flex items-center justify-between rounded-2xl group">
      <div className="space-y-1 flex items-center gap-x-4">
        {task.status === "done" && <Check className="text-blue-500 size-6" />}
        <div>
          <p className="text-blue-500 text-sm font-medium">@{task.assignedTo.username}</p>
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

        <Button
          size={"icon"}
          variant={"ghost"}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <TrashIcon className="h-4 w-4" />
        </Button>

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
