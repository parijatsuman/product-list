const baseClassName = "cursor-pointer rounded-md bg-stone-900 px-3 py-2 text-white";

export default function Button({ children, className = "", type = "button", ...props }) {
  return <button type={type} className={`${baseClassName} ${className}`} {...props}>{children}</button>;
}
