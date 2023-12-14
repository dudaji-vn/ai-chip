'use client'

import Link from "next/link";
import { useDispatch } from "react-redux";

import Avatar from "@/components/shared/Avatar";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Typography from "@/components/shared/Typography";
import { toggleSidebar } from "@/stores/slice/global.slice";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";

export default function Header() {
    const dispatch = useDispatch();
    const onToggleSidebar = () => {
        dispatch(toggleSidebar());
    }
    return (
        <header className="fixed top-0 left-0 right-0 p-6 bg-gray-800 flex items-center justify-center gap-8 z-20 border-b border-gray-700 h-[80px]">
            <div className="p-2 hover:bg-slate-700 rounded-md transition-all cursor-pointer" onClick={onToggleSidebar}>
                <Bars3CenterLeftIcon className="h-5 w-5 text-white"/>
            </div>
            <Typography tag='h1' size="2xl" className="md:flex-none flex-1">OurApp</Typography>
            <Breadcrumb />
            <div className="flex gap-4 flex-center items-center">
                <Avatar />
                <span className="max-h-8 h-8 w-[1px] bg-gray-700 block"></span>
                <Link href="/" className="font-medium">Logout</Link>
            </div>
        </header>
    );
}
