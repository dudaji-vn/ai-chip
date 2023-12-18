'use client'

import Link from "next/link";
import { memo, useState } from "react";

import Avatar from "@/components/shared/Avatar";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Typography from "@/components/shared/Typography";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import Modal from "@/components/shared/Modal";
import Button from "@/components/shared/Button";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "@/stores";
import { logout } from "@/stores/slice/auth.slice";

interface Props {
    toggleSidebar: () => void;
}

export default memo(function Header({ toggleSidebar } : Props)  {
    const [isShowModalLogout, setIsShowModalLogout] = useState(false);
    const toggleModalLogout = () => setIsShowModalLogout(prev => !prev)
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(logout())
        setIsShowModalLogout(false);
    }

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
                <a className="font-medium cursor-pointer" onClick={toggleModalLogout}>Logout</a>
            </div>
            <Modal isOpen={isShowModalLogout} onClose={toggleModalLogout} className='max-w-[360px]'>
                <div className='flex flex-col gap-4 py-4 items-center mb-10 pb-0'>
                    <p className='text-gray-400 text-center'>Are you sure want to logout?</p>
                </div>
                <div className='flex item-center gap-4'>
                    <Button type='danger' className='flex-1' onClick={handleLogout}>Yes, I’m sure</Button>
                    <Button type='cancel' className='flex-1' onClick={toggleModalLogout}>No, cancel</Button>
                </div>
            </Modal>
        </header>
    );
});

