'use client';

import { RootState } from "@/stores";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";


interface Props {
    children: React.ReactNode;
}

export default function NotLoginLayout({ children }: Props) {
    const router = useRouter();
    const isAuthentication = useSelector((state: RootState) => state.AuthStore.isAuthentication)
    if(isAuthentication) {
        router.push('/')
    }
    return (
        <div>
            {children}
        </div>
    );
}