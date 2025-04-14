import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useDeleteTaskMutation } from "@/hooks/queries/tasks";
import { Button } from "./ui/button";

export const DeleteTaskDialog = ({
  children,
  taskId,
}: {
  children: React.ReactNode;
  taskId: number;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutation } = useDeleteTaskMutation();

  const deleteTask = () => {
    mutation.mutate(
      { id: taskId },
      {
        onSuccess: () => {
          setDialogOpen(false);
        },
      }
    );
  };

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will delete this task.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteTask} asChild>
            <Button variant={"destructive"}>{mutation.isPending ? "Loading..." : "Delete"}</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
