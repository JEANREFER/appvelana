// components/ui/badge.tsx
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        variant === "secondary" ? "bg-gray-200 text-gray-800" : "bg-blue-600 text-white",
        className
      )}
      {...props}
    />
  );
}
