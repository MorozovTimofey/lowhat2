import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const panelVariants = cva("group text-black dark:text-white", {
  variants: {
    variant: {
      default:
        "bg-[#F8F8F8] dark:bg-[#1e2939] flex flex-col rounded-[10px] p-[14px] overflow-auto",
      aside:
        "bg-[#F8F8F8] dark:bg-[#151515] md:w-[328px] overflow-auto panel-aside flex flex-col gap-[24px] h-full rounded-[10px] p-[14px]",
      content:
        "overflow-auto bg-[#F4F4F4] dark:bg-[#191919] flex flex-col gap-[14px] flex-1 h-full rounded-[10px] p-[14px]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface PanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelVariants> {
  asChild?: boolean;
}

const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(panelVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Panel.displayName = "Panel";

export default Panel;
