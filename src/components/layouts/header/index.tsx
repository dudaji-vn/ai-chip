'use client'

import { memo, useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { UsersIcon } from "@heroicons/react/24/outline";

import Avatar from "@/components/shared/avatar";
import Breadcrumb from "@/components/shared/breadcrumb";
import Typography from "@/components/shared/typography";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import Modal from "@/components/shared/modal";
import Button from "@/components/shared/button";
import { useAppDispatch, useAppSelector } from "@/stores";
import { logout } from "@/stores/slice/auth.slice";
import { Select } from "@/components/shared/form";
import useUserApi from "@/core/hooks/api/use-user-api";
import { User } from "@/core/interfaces/user.interface";
import { changeCurrentUserId } from "@/stores/slice/global.slice";

interface Props {
    toggleSidebar: () => void;
}

export default memo(function Header({ toggleSidebar } : Props)  {
    const pathname = usePathname();
    const dispatch = useAppDispatch();

    const [isShowModalLogout, setIsShowModalLogout] = useState(false);
    const userRole = useAppSelector(state => state.AuthStore.user?.role);
    const current_user_id = useAppSelector(state => state.GlobalStore.current_user_id);
    
    const { users } = useUserApi();
    let userOptions = users?.map((user: User) => ({ label: user.name, value: user.id })) || [];

    const currentUserName = users?.find((user: User) => user.id == current_user_id)?.name || '';

    const toggleModalLogout = useCallback(() => {
        setIsShowModalLogout(!isShowModalLogout);
    }, [isShowModalLogout]);

    const handleLogout = () => {
        dispatch(logout())
        setIsShowModalLogout(false);
    }
    const handleChangeUser = (value: string) => {
        dispatch(changeCurrentUserId(value))
    }

    return (
        <header className="fixed top-0 left-0 right-0 p-6 bg-gray-900 flex items-center justify-center gap-8 z-30 border-b border-gray-700 h-[80px]">
            <div className="p-2 hover:bg-slate-700 rounded-md transition-all cursor-pointer" onClick={toggleSidebar}>
                <Bars3CenterLeftIcon className="h-5 w-5 text-white"/>
            </div>
            <Typography tag='h1' size="2xl" className="md:flex-none flex-1">OurApp</Typography>
            <Breadcrumb />
            <div className="flex gap-4 flex-center items-center">
                {userRole == 'admin' && pathname == '/' &&
                    <Select
                        className="w-[200px]"
                        placeholder="Select User"
                        defaultValue={currentUserName || ''}
                        icon={<UsersIcon className="w-5 h-5" />}
                        options={userOptions}
                        onChange={handleChangeUser}
                    ></Select>
                }
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

