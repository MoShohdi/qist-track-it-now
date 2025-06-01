
import { cn } from "@/lib/utils";

interface SegmentedProgressProps {
  current: number;
  total: number;
  className?: string;
}

export const SegmentedProgress = ({ current, total, className }: SegmentedProgressProps) => {
  const segments = Array.from({ length: total }, (_, index) => index < current);

  return (
    <div className={cn("flex gap-1", className)}>
      {segments.map((isPaid, index) => (
        <div
          key={index}
          className={cn(
            "h-2 flex-1 rounded-full transition-colors",
            isPaid ? "bg-teal-600" : "bg-gray-200"
          )}
        />
      ))}
    </div>
  );
};
