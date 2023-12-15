'use client'

import Link from "next/link";
import { memo } from "react";

import Avatar from "@/components/shared/Avatar";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Typography from "@/components/shared/Typography";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";

interface Props {
    toggleSidebar: () => void;
}

export default memo(function Header({ toggleSidebar } : Props)  {
    return (
        <header className="fixed top-0 left-0 right-0 p-6 bg-gray-900 flex items-center justify-center gap-8 z-20 border-b border-gray-700 h-[80px]">
            <div className="p-2 hover:bg-slate-700 rounded-md transition-all cursor-pointer" onClick={toggleSidebar}>
                <Bars3CenterLeftIcon className="h-5 w-5 text-white"/>
            </div>
            <Typography tag='h1' size="2xl" className="md:flex-none flex-1">OurApp</Typography>
            <Breadcrumb />
            <div className="flex gap-4 flex-center items-center">
                <Avatar src='/images/avatar.png' alt='Avatar'/>
                <span className="max-h-8 h-8 w-[1px] bg-gray-700 block"></span>
                <Link href="/login" className="font-medium">Logout</Link>
            </div>
        </header>
    );
});

