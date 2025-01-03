import Image from "next/image"
import Link from "next/link"
import { FaGithub } from "react-icons/fa6"

export default () => {
    return (
        <footer className="px-12 bg-zinc-950 border-t border-zinc-800/50">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto flex flex-col gap-8">
                    {/* Main Content */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        {/* Logo and Links */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/img/vatacars-logo-sm-dark.png"
                                    alt="vatACARS Logo"
                                    width={24}
                                    height={24}
                                    className="relative"
                                />
                                <span className="text-zinc-100 font-medium">vatACARS</span>
                            </div>

                            <div className="flex flex-wrap gap-6">
                                {/*<Button variant="link" className="text-zinc-400 hover:text-zinc-100 p-0 h-auto">
                                    Features
                                </Button>
                                <Button variant="link" className="text-zinc-400 hover:text-zinc-100 p-0 h-auto">
                                    Documentation
                                </Button>
                                <Button variant="link" className="text-zinc-400 hover:text-zinc-100 p-0 h-auto">
                                    Support
                                </Button>
                                <Button variant="link" className="text-zinc-400 hover:text-zinc-100 p-0 h-auto">
                                    GitHub
                                </Button>*/}
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-3 text-xl">
                            <a href="https://github.com/vatACARS" target="_blank" className="text-zinc-500 hover:text-zinc-400 transition-colors duration-200">
                                <FaGithub />
                            </a>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-zinc-800/50">
                        <div className="flex-col">
                            <p className="text-sm text-zinc-500">&copy; {new Date().getFullYear()} vatACARS Team. All rights reserved.</p>
                            <span className="font-medium text-xs text-zinc-600">Real world aviation use is prohibited.</span>
                        </div>
                        <div className="flex gap-6 text-sm">
                            <Link href="/legal/attribution">
                                <span className="font-medium text-zinc-400 hover:text-zinc-200 link link-animated transition-colors duration-200">Open Source Attributions</span>
                            </Link>
                            <Link href="/legal/terms">
                                <span className="font-medium text-zinc-400 hover:text-zinc-200 link link-animated transition-colors duration-200">Terms</span>
                            </Link>
                            <Link href="/legal/privacy">
                                <span className="font-medium text-zinc-400 hover:text-zinc-200 link link-animated transition-colors duration-200">Privacy</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}