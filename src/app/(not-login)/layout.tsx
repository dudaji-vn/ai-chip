'use client';

import { RootState } from "@/stores";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

interface Props {
    children: React.ReactNode;
}

export default function NotLoginLayout({ children }: Props) {
    const router = useRouter();
    const isAuthentication = useSelector((state: RootState) => state.AuthStore.isAuthentication)
    useEffect(() => {
        if (isAuthentication) {
            router.push('/')
        }
    }, [isAuthentication, router])

    if (isAuthentication) return null

    return (
        <div className="w-full min-h-screen px-2 py-4 flex items-center justify-center bg-gray-900 text-white">
            <div className="p-8 w-full max-w-[460px] text-center bg-gray-800 rounded-sm border border-gray-700 flex flex-col">
                {children}
            </div>
        </div>
    );
}