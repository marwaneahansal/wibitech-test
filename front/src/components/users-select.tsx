import { useUsersQuery } from "@/hooks/queries/tasks";
import { FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export const UsersSelect = ({
  onChange,
  defaultValue,
}: {
  onChange: (...event: unknown[]) => void;
  defaultValue?: string | undefined;
}) => {
  const { data: users } = useUsersQuery();

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
