"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Navbar() {
    return (
        <header className="border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="text-xl font-semibold">
                    FindGoodReads
                </Link>

                <div className="flex flex-row">
                    {/* Desktop menu */}
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/" className="px-4 py-2">
                                    Home
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/about" className="px-4 py-2">
                                    Books
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* CTA button */}
                    <Button className="hidden md:inline-flex mx-10">Get Started</Button>
                    <ModeToggle className="hidden md:inline-flex" />

                    {/* Mobile menu */}
                    <Sheet>
                        <SheetTrigger className="md:hidden">
                            <Menu className="h-6 w-6" />
                        </SheetTrigger>
                        <SheetContent side="right" className="w-64">
                            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                            <nav className="flex flex-col gap-4 mt-8">
                                <Link href="/" className="text-lg ml-4">
                                    Home
                                </Link>
                                <Link href="/about" className="text-lg ml-4">
                                    About
                                </Link>
                                <Button className="mt-4 mx-6">Get Started</Button>
                                <ModeToggle className="mx-6 mt-2" />
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>

            </div>
        </header>
    );
}
