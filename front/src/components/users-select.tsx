import { useUsersQuery } from "@/hooks/queries/tasks";
import { FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";

export const UsersSelect = ({
  onChange,
  defaultValue,
}: {
  onChange: (...event: unknown[]) => void;
  defaultValue?: string | undefined;
}) => {
  const { data: users, error, isError } = useUsersQuery();

  if (error && isError) {
    toast.error("Error", {
      description:
        error.message || "Something went wrong while getting the users, Please try again later!",
    });
    return <p>Error...</p>;
  }

  return (
    <FormItem>
      <FormLabel>Assign to</FormLabel>
      <Select onValueChange={onChange} defaultValue={defaultValue}>
        <SelectTrigger id="assignTo" className="w-full">
          <SelectValue placeholder="Assign To" />
        </SelectTrigger>
        <SelectContent>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id.toString()}>
              {user.username}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};
