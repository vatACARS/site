import Navbar from "@comp/ui/navbar";
import Footer from "@comp/ui/footer";

export default ({ children, ...pageInfo }) => {
    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <Navbar />
            <div className="py-24 px-8 md:px-12 xl:px-0 max-w-6xl mx-auto">
                {children}
            </div>
            <Footer />
        </main>
    )
}