import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useUpdateTaskMutation } from "@/hooks/queries/tasks";
import { useForm } from "react-hook-form";
import { updateTaskSchema } from "@/schemas/taskSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { DialogDescription } from "@radix-ui/react-dialog";
import { type Task } from "@/lib/types";
import { useAuth } from "@/hooks/use-auth";
import { UsersSelect } from "./users-select";
import { cn } from "@/lib/utils";

export const EditTaskDialog = ({ task, children }: { children: React.ReactNode; task: Task }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<z.input<typeof updateTaskSchema>>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      id: task.id,
      title: task.title,
      description: task.description,
      user_id: task.user.id,
    },
  });

  const { mutation } = useUpdateTaskMutation();

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        setDialogOpen(false);
      },
    });
  });

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[35%]">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <DialogDescription />
            <div className="flex flex-col w-full gap-6">
              <div className="grid grid-cols-3 gap-4">
                <div
                  className={cn("flex flex-col space-y-2.5", isAdmin ? "col-span-2" : "col-span-3")}
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="What's on your mind?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {isAdmin && (
                  <div className="flex flex-col space-y-2.5">
                    <FormField
                      control={form.control}
                      name="user_id"
                      render={({ field }) => (
                        <UsersSelect
                          onChange={field.onChange}
                          defaultValue={task.user.id.toString()}
                        />
                      )}
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-2.5 col-span-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          id="description"
                          placeholder="Add relevant details, blockers, or context for this task here."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant={"outline"}>
                  Cancel
                </Button>
              </DialogClose>
              <Button>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
