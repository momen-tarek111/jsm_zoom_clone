"use client"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
    SheetTitle
    
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const MobileNav = () => {
    const pathname = usePathname();
    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger asChild>
                    <Image
                        src="/icons/hamburger.svg"
                        width={36}
                        height={36}
                        alt="hamburger"
                        className="cursor-pointer sm:hidden"
                    />
                </SheetTrigger>
                <SheetContent side="left" className="border-none bg-dark-1 pl-5 pt-5">
                    <SheetTitle className="hidden"></SheetTitle>
                    <Link href="/" className="flex items-center gap-1">
                        <Image src="/icons/logo.svg"
                            width={32}
                            height={32}
                            alt="Yoom logo"
                            className="max-sm:size-10"
                        />
                        <p className='text-[26px] font-extrabold text-white' >
                            Yoom
                        </p>
                    </Link>
                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                        <SheetClose asChild>
                            <div className="flex flex-col h-full gap-6 pt-16 text-white">
                                {
                                    sidebarLinks.map((link) => {
                                        const isActive = pathname === link.route;
                                        return (
                                            <SheetClose asChild key={link.label}>
                                                <Link
                                                    key={link.label}
                                                    href={link.route}
                                                    className={cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-60', {
                                                        'bg-blue-1': isActive,
                                                    }
                                                    )}
                                                >
                                                    <Image
                                                        src={link.imgUrl}
                                                        alt={link.label}
                                                        width={24}
                                                        height={24}
                                                        priority
                                                        className="w-fit"
                                                    />
                                                    <p className=' font-semibold'>
                                                        {link.label}
                                                    </p>
                                                </Link>
                                            </SheetClose>
                                        )
                                    })
                                }
                            </div>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}
export default MobileNav