import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

export default memo(({ data }: { data: any }) => {
    return (
        <div className="flex flex-col px-2 py-1 min-w-32 items-center justify-center bg-zinc-900 text-white border-2 border-zinc-700 rounded-lg">
            {data.sourceHandle && <Handle type="source" position={Position.Right} />}
            {data.targetHandle && <Handle type="target" position={Position.Left} />}
            <div className="grid text-center items-center">
                <p className="text-sm">{data.title}</p>
                <p className={`text-xs font-medium ${data.valueType === "info" ? "text-blue-500" : data.valueType === "success" ? "text-green-500" : "text-slate-300"}`}>{data.value}</p>
            </div>
        </div>
    );
});