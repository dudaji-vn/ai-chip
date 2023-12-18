'use client'

import React from 'react'
import Alert from '@/components/shared/Alert'
import Avatar from '@/components/shared/Avatar'
import Typography from '@/components/shared/Typography'
import { loginService } from '@/services/auth.service'
import { useAppDispatch } from '@/stores'
import { UserCircleIcon } from '@heroicons/react/24/outline'

export default function LoginUser() {
    
    const dispatch = useAppDispatch()
    const [alert, setAlert] = React.useState<string>('')

    const handleLogin = async (email: string) => {
        let response = await dispatch(loginService({id: email}))
        if(response.type == "auth/loginService/rejected") {
            setAlert('Your account is not registered')
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="p-8 w-full max-w-[460px] text-center bg-gray-800 rounded-sm border border-gray-700 flex flex-col ">
                <div className='p-8 flex flex-col gap-8'>
                    <Typography tag='h1' size="4xl">promitor</Typography>
                    <div>
                        <Typography tag='h2' size="xl" className="font-normal text-white mb-2">Choose an account</Typography>
                        <p>to continue to <a href="#">OurApp</a></p>
                    </div>
                </div>
                <div className='pb-6'>
                    <div onClick={()=>handleLogin('user@dudaji.com')} className='flex gap-3 p-4 border-b border-gray-600 items-center transition-all cursor-pointer hover:bg-gray-700'>
                        <Avatar
                            src='/images/avatar.png'
                            alt='Avatar'
                            className='mx-auto w-12 h-12'
                        ></Avatar>
                        <div className='flex-1 text-left'>
                            <h3 className='mb-[6px] text-base leading-none font-semibold'>demo_user</h3>
                            <p className="text-sm text-gray-500 font-normal">user@dudaji.com</p>
                        </div>
                    </div>
                    <div onClick={()=>handleLogin('another_user@dudaji.com')} className='flex gap-3 p-4 border-b border-gray-600 items-center transition-all cursor-pointer hover:bg-gray-700'>
                        <Avatar
                            src='/images/avatar.png'
                            alt='Avatar'
                            className='mx-auto w-12 h-12'
                        ></Avatar>
                        <div className='flex-1 text-left'>
                            <h3 className='mb-[6px] text-base leading-none font-semibold'>demo_user_2</h3>
                            <p className="text-sm text-gray-500 font-normal">another_user@dudaji.com</p>
                        </div>
                    </div>
                    <div className='flex font-semibold gap-3 p-4 items-center transition-all cursor-pointer hover:bg-gray-700'>
                        <UserCircleIcon className="w-6 h-6 text-gray-500"></UserCircleIcon>
                        <div className='flex-1 text-left'>
                            <p className="text-sm text-gray-500 font-semibold">Use another account</p>
                        </div>
                    </div>
                </div>
                <Alert message={alert} className='mb-6'></Alert>
                <div className='flex justify-end  border-t border-gray-600'>
                    <p className='px-4 py-[6px] text-gray-400 text-xs font-medium cursor-pointer'>Help</p>
                    <p className='px-4 py-[6px] text-gray-400 text-xs font-medium cursor-pointer'>Privacy</p>
                    <p className='px-4 py-[6px] text-gray-400 text-xs font-medium cursor-pointer'>Terms</p>
                </div>
            </div>
        </div>
    )
}
