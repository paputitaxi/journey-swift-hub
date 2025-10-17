import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant hover:shadow-glow hover:scale-[1.02]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-elegant hover:shadow-glow hover:scale-[1.02]",
        outline:
          "border-2 border-primary/30 bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/50 hover:scale-[1.02]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-card hover:shadow-elegant hover:scale-[1.02]",
        ghost: "hover:bg-accent/50 hover:backdrop-blur-sm hover:scale-[1.02]",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-primary-foreground shadow-glow hover:bg-right-bottom animate-gradient hover:scale-[1.02]",
        premium: "bg-gradient-to-br from-primary via-accent to-primary text-primary-foreground shadow-glow hover:shadow-[0_0_60px_hsl(var(--primary-glow)/0.6)] hover:scale-[1.02]",
        glass: "bg-card/30 backdrop-blur-md border border-primary/20 text-foreground hover:bg-card/40 hover:border-primary/30 hover:scale-[1.02]",
        orange: "bg-gradient-to-br from-[hsl(25,95%,63%)] to-[hsl(33,100%,65%)] text-[hsl(220,40%,8%)] shadow-[0_10px_30px_-10px_hsl(25,95%,63%,0.4)] hover:shadow-[0_0_40px_hsl(33,100%,65%,0.5)] hover:scale-[1.02]",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-xl px-8 text-base",
        xl: "h-16 rounded-2xl px-10 text-lg font-semibold",
        icon: "h-12 w-12",
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
