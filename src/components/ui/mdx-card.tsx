import Link from "next/link";

import { cn } from "@lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    href?: string
    disabled?: boolean
}

export function MdxCard({
    className,
    children,
    disabled,
    ...props
}: CardProps) {
    return (
        <div
            className={cn(
                "group relative rounded-lg border p-6 shadow-md transition-all duration-200 hover:border-blue-400 hover:bg-zinc-800/20",
                disabled && "cursor-not-allowed opacity-60",
                className
            )}
            {...props}
        >
            <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-2 [&>h3]:!mt-0 [&>h4]:!mt-0 [&>p]:text-zinc-600 hover:text-zinc-200 transition-all">
                    {children}
                </div>
            </div>
        </div>
    )
}