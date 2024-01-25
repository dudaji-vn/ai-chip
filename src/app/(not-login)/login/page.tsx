'use client';

import Button from "@/components/shared/button";
import Typography from "@/components/shared/typography";
import PAGES from "@/core/constant/pages";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

export default function LoginPage() {
    const router = useRouter();
    return (
        <Fragment>
            <Typography tag='h1' size="4xl" className="mb-6">ChipPulse </Typography>
            <Typography tag='h2' size="2xl" className="mb-4">Introduction</Typography>
            <Typography size="xl" className="mb-6">Short description for the product</Typography>
            <Button className="mb-6" type="secondary" onClick={()=>router.push(PAGES.LOGIN_USER)}>Login as User</Button>
            <Button className="mb-6" type="secondary" onClick={()=>router.push(PAGES.LOGIN_ADMIN)}>Login as Admin</Button>
            <Typography size="sm">By clicking Continue with, you agree to ChipPulse <a href="#">Terms of Use</a> and <a href="#">Privacy Policy.</a></Typography>
        </Fragment>
    )
}
