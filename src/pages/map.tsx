import Map from "@comp/ui/map";

export default () => {
    return (
        <div className="h-full w-full flex flex-col">
            <div className="h-[72px]">
                <h1 className="text-2xl font-bold">Map</h1>
            </div>
            <div>
                <Map className="h-[calc(100vh-124px)] w-[100%]" />
            </div>
        </div>
    )
}