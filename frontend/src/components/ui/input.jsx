export const Input = ({ className, type = "text", ...props }) => (
  <input
    type={type}
    className={`h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
    {...props}
  />
)
