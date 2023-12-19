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
        if(isAuthentication) {
            router.push('/')
        }
    }, [isAuthentication, router])

    if(isAuthentication) return null
    
    return (
        <div>
            {children}
        </div>
    );
}