import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#FF6B00] text-white hover:bg-[#E66000] shadow-[0_4px_14px_rgba(255,107,0,0.25)] hover:shadow-[0_6px_20px_rgba(255,107,0,0.35)]",
        destructive:
          "bg-[#EF4444] text-white hover:bg-[#DC2626] shadow-sm",
        outline:
          "border border-white/10 bg-white/5 hover:bg-white/10 text-white shadow-sm backdrop-blur-md",
        secondary:
          "bg-[#1F3BB3] text-white hover:bg-[#1A3299] shadow-sm",
        ghost: "hover:bg-white/10 text-slate-300 hover:text-white",
        link: "text-[#22D3EE] underline-offset-4 hover:underline hover:text-white transition-colors",
      },
      size: {
        default: "h-11 px-6 py-2 text-[15px] font-[600]",
        sm: "h-9 px-4 text-sm font-[500]",
        lg: "h-14 px-8 text-[16px] font-[600]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
