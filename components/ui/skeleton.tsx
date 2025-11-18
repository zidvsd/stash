import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "dark:bg-sidebar-primary bg-neutral-300 animate-pulse rounded-md",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
