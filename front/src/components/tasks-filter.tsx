import { useState } from "react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { useSearchParams } from "react-router";

export const TasksFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const statusQuery = searchParams.get("status") || "all";

  const [query, setQuery] = useState<string>(searchQuery);
  const [statusValue, setStatusValue] = useState<string>(statusQuery);

  const isFilterEnabled = searchQuery !== "" || statusQuery !== "all";

  const tasksStatus = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "In Progress",
      value: "in_progress",
    },
    {
      label: "Done",
      value: "done",
    },
  ];

  const onStatusChange = (value: string) => {
    setStatusValue(value);
  };

  const filterTasks = () => {
    if (isFilterEnabled) {
      setQuery("");
      setStatusValue("all");
      searchParams.set("search", "");
      searchParams.set("status", "all");
    } else {
      searchParams.set("search", query);
      searchParams.set("status", statusValue);
    }


    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center gap-x-4">
      <Input
        className="min-w-72"
        placeholder="filter tasks by title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Select onValueChange={onStatusChange} defaultValue={statusValue}>
        <SelectTrigger id="assignTo" className="min-w-36 w-full">
          <SelectValue placeholder="Assign To" />
        </SelectTrigger>
        <SelectContent>
          {tasksStatus?.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant={"outline"} onClick={filterTasks}>
        {isFilterEnabled ? "Reset" : "Filter"}
      </Button>
    </div>
  );
};
