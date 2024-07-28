export default function ProfileSupport({ user }) {
    return (
        <>
            <h4 className="font-light text-3xl">Help & Support</h4>
            <div className="flex flex-col space-y-2 mt-4">
                <p>This tab is currently a work in progress!</p>
                <div className="flex flex-col">
                <span>Preferably, contact a <span className="font-semibold text-[#cc4c15]">@Maintainer</span> in our Discord server.</span>
                <span>If this isn't an option for you, you can email us at <a href="mailto://contact@vatacars.com" className="underline text-blue-400 hover:text-notsodark transition-all duration-300">contact@vatacars.com</a>.</span>
                </div>
            </div>
        </>
    )
}