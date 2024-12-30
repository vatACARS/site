import { cn } from "@lib/utils"

interface CalloutProps {
    icon?: string
    children?: React.ReactNode
    type?: "default" | "warning" | "danger"
}

export function Callout({
    children,
    icon,
    type = "default",
    ...props
}: CalloutProps) {
    return (
        <div
            className={cn("my-6 flex items-start rounded-md border border-l-8 p-4", {
                "border-red-600 text-red-50": type === "danger",
                "border-yellow-600 text-yellow-50": type === "warning",
            })}
            {...props}
        >
            {icon && <span className="mr-4 text-2xl">{icon}</span>}
            <div>{children}</div>
        </div>
    )
}