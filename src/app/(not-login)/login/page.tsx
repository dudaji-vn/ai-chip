'use client';

import Button from "@/components/shared/Button";
import Typography from "@/components/shared/Typography";
import PAGES from "@/core/constant/pages";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="p-8 w-full max-w-[460px] text-center bg-gray-800 rounded-sm border border-gray-700 mx-4">
                <Typography tag='h1' size="4xl" className="mb-6">OurApp </Typography>
                <Typography tag='h2' size="2xl" className="mb-4">Introduction</Typography>
                <Typography size="xl" className="mb-6">Short description for the product</Typography>
                <Button className="mb-6" type="secondary" onClick={()=>router.push(PAGES.LOGIN_USER)}>Login as User</Button>
                <Button className="mb-6" type="secondary" onClick={()=>router.push(PAGES.LOGIN_ADMIN)}>Login as Admin</Button>
                <Typography size="sm">By clicking Continue with, you agree to OurApp <a href="#">Terms of Use</a> and <a href="#">Privacy Policy.</a></Typography>
            </div>
        </div>
    )
}
