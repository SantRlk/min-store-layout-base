"use client"

export const Button = ({ className, variant = "default", size = "default", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-300 bg-white hover:bg-slate-50",
    ghost: "hover:bg-slate-100",
    secondary: "bg-slate-200 text-slate-900 hover:bg-slate-300",
  }
  
  const sizes = {
    default: "h-10 px-4 text-sm",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10",
  }
  
  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className || ""}`}
      {...props}
    />
  )
}
