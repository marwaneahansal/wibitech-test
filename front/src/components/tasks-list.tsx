import { type Task } from "@/lib/types";
import { useAuth } from "@/hooks/use-auth";
import { TaskCard } from "./task-card";

type TasksListProps = {
  tasks: Task[];
};

export const TasksList = ({ tasks }: TasksListProps) => {
  if (tasks.length === 0) {
    return <TasksEmptyState />;
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

const TasksEmptyState = () => {
  const { user } = useAuth();

  if (user?.role === "admin")
    return (
      <p className="text-lg text-center">Your team got no task currently! start by adding them.</p>
    );

  return <p className="text-lg text-center">You've got no task currently assigned to you!</p>;
};
