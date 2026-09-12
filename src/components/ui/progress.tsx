import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const pct = Math.min(100, Math.max(0, value ?? 0));
  return (
    <ProgressPrimitive.Root
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)}
      value={pct}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full bg-primary transition-[width] duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]"
        style={{ width: `${pct}%` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
