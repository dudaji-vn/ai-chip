'use client';

import Header from "@/components/layouts/Header";
import LeftSidebar from "@/components/layouts/LeftSideBar";
import { GlobalLoading } from "@/components/shared/Loading";
import { RootState } from "@/stores";
import { useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

interface Props {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
    const router = useRouter();
    
    const isAuthentication = useSelector((state: RootState) => state.AuthStore.isAuthentication)

    const toggleSidebar = useCallback(() => {
        setIsOpenSidebar((prev: boolean) => !prev);
    }, []);

    useEffect(() => {
        if(!isAuthentication) {
            router.push('/login')
            return;
        }
    }, [isAuthentication, router])

    if(!isAuthentication) {
        return null;
    }
    
    return (
        <Suspense fallback={<GlobalLoading />}>
            <div className='bg-gray-900 text-white min-h-screen pt-[80px] pb-20'>
                <Header toggleSidebar={toggleSidebar}/>
                <main className={twMerge('w-full flex overflow-x-hidden page-container', isOpenSidebar ? 'sidebar-expand' : 'sidebar-collapse')}>
                    <LeftSidebar/>
                    <div className="flex-1 mx-auto p-4 overflow-auto no-scrollbar page-content transition-all duration-200">
                        {children}
                    </div>
                </main>
            </div>
        </Suspense>
    );
}