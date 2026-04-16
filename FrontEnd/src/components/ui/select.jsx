import React from "react"
import { cn } from "@/lib/utils"

const Select = React.forwardRef(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent text-sm shadow-sm shadow-black/5 transition-shadow focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 px-3 py-1",
      className
    )}
    {...props}
  >
    {children}
  </select>
))

const SelectGroup = ({ children, ...props }) => (
  <optgroup {...props}>{children}</optgroup>
)

const SelectValue = ({ placeholder, ...props }) => (
  <option value="" disabled {...props}>
    {placeholder}
  </option>
)

const SelectTrigger = Select

const SelectContent = ({ children, ...props }) => (
  <>{children}</>
)

const SelectLabel = ({ className, ...props }) => (
  <label
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
)

const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <option
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
      className
    )}
    {...props}
  >
    {children}
  </option>
))

const SelectSeparator = ({ className, ...props }) => (
  <hr
    className={cn("-mx-1 my-1 h-px bg-muted border-0", className)}
    {...props}
  />
)

const SelectScrollUpButton = () => null
const SelectScrollDownButton = () => null

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
