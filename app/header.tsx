import Link from "next/link";
import localFont from 'next/font/local';

const Koulen = localFont({ src: "./Koulen-Regular.ttf" })

export default function Header() {
    return (
        <div>
            <header className="z-50 border-b border-[#292929] h-14 fixed top-0 w-full bg-[#dedac9] text-[#292929]">
                <div className="flex items-center justify-between h-full px-4">
                    <div className="flex items-center">
                        <div className={Koulen.className}>
                            <a href="/" className="flex items-center h-14 text-2xl tracking-[0.15rem]">
                                <div className="px-3">
                                    JUPITER
                                </div>
                            </a>
                        </div>
                    </div>
                    <nav className="flex h-full">
                        <Link href="/search" className="h-full px-4 flex items-center hover:bg-[#00000020] transition duration-500">Search</Link>
                        <Link href="/projects" className="h-full px-4 flex items-center hover:bg-[#00000020] transition duration-500">Projects</Link>
                        <Link href="/regist" className="h-full px-4 flex items-center hover:bg-[#00000020] transition duration-500">Regist</Link>
                        <Link href="/" className="h-full px-4 flex items-center hover:bg-[#00000020] transition duration-500">Help</Link>
                    </nav>
                </div>
            </header>
        </div>
    )
}