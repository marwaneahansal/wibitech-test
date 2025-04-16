import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur:sm">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="size-10 animate-spin text-primary" />
        <p className="text-primary">Loading...</p>
      </div>
    </div>
  );
};
