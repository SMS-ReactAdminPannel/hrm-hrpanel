"use client"

import * as React from "react"
import clsx from "clsx"

interface DropdownMenuProps {
  children: React.ReactNode
}

interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "end" | "center"
}

interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function DropdownMenu({ children }: DropdownMenuProps) {
  return <div className="relative inline-block text-left">{children}</div>
}

export function DropdownMenuTrigger({ className, asChild = false, children, ...props }: DropdownMenuTriggerProps) {
  const [open, setOpen] = React.useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setOpen(!open)
    props.onClick?.(e)
  }

  if (asChild) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ...(children as React.ReactElement<any>).props,
      onClick: (e: React.MouseEvent<any>) => {
        if (typeof (children as React.ReactElement<any>).props.onClick === "function") {
          (children as React.ReactElement<any>).props.onClick(e)
        }
        handleClick(e as React.MouseEvent<HTMLButtonElement>)
      },
      "aria-expanded": open,
      "data-state": open ? "open" : "closed",
    })
  }

  return (
    <button
      type="button"
      className={className}
      aria-expanded={open}
      data-state={open ? "open" : "closed"}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}

export function DropdownMenuContent({ className, align = "end", children, ...props }: DropdownMenuContentProps) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setOpen(true)

    const handleClickOutside = () => {
      setOpen(false)
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  if (!open) return null

  return (
    <div
      className={clsx(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md",
        {
          "right-0": align === "end",
          "left-0": align === "start",
          "left-1/2 -translate-x-1/2": align === "center",
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function DropdownMenuItem({ className, children, ...props }: DropdownMenuItemProps) {
  return (
    <button
      className={clsx(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
