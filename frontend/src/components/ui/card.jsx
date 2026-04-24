import React from "react"

export const Card = ({ className, ...props }) => (
  <div className={`rounded-lg border border-slate-200 bg-white shadow-sm ${className || ""}`} {...props} />
)

export const CardHeader = ({ className, ...props }) => (
  <div className={`p-6 ${className || ""}`} {...props} />
)

export const CardTitle = ({ className, ...props }) => (
  <h2 className={`text-2xl font-semibold ${className || ""}`} {...props} />
)

export const CardDescription = ({ className, ...props }) => (
  <p className={`text-sm text-slate-500 ${className || ""}`} {...props} />
)

export const CardContent = ({ className, ...props }) => (
  <div className={`p-6 pt-0 ${className || ""}`} {...props} />
)

export const CardFooter = ({ className, ...props }) => (
  <div className={`flex items-center p-6 pt-0 ${className || ""}`} {...props} />
)
