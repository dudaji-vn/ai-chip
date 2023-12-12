import Avatar from "@/components/shared/Avatar";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Typography from "@/components/shared/Typography";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 p-6 bg-gray-800 flex items-center justify-center gap-8">
            <div className="p-1 hover:bg-slate-700 rounded-md transition-all cursor-pointer">
                <Bars3CenterLeftIcon className="h-6 w-6 text-white"/>
            </div>
            <Typography tag='h1' size="2xl">OurApp</Typography>
            <Breadcrumb />
            <div className="flex gap-4 flex-center items-center">
                <Avatar />
                <span className="max-h-8 h-8 w-[1px] bg-gray-700 block"></span>
                <Link href="/" className="font-medium">Logout</Link>
            </div>
        </header>
    );
}
