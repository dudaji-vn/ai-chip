'use client';

import Header from "@/components/layouts/Header";
import LeftSidebar from "@/components/layouts/LeftSideBar";
import { StoreName } from "@/core/enums/store.enum";
import { useAppSelector } from "@/stores";
import { twMerge } from "tailwind-merge";

interface Props {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
    const isOpenSidebar = useAppSelector(state => state[StoreName.GLOBAL_STORE].isOpenSidebar)

    return (
        <div className='bg-gray-900 text-white '>
            <Header />
            <main className='w-full flex min-h-screen overflow-x-hidden mt-[80px]'>
                <LeftSidebar/>
                <div className="flex-1 max-w-[1440px] mx-auto p-4">
                    {children}
                </div>
            </main>
        </div>
    );
}