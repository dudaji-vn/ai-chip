'use client'

import Alert from '@/components/shared/alert'
import Button from '@/components/shared/button'
import { Input } from '@/components/shared/form'
import Typography from '@/components/shared/typography'
import { loginService } from '@/services/auth.service'
import { RootState, useAppDispatch } from '@/stores'
import { LockClosedIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

export default function LoginAdmin() {

    const dispatch = useAppDispatch()
    const [alert, setAlert] = React.useState<string>('')

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange",
        defaultValues: { id: "", password: "" },
    });

    const onSubmit = handleSubmit(async (data) => {
        let response = await dispatch(loginService(data))
        if (response.type == "auth/loginService/rejected") {
            setAlert('Your account or password is incorrect')
        }
    })

    return (
        <form onSubmit={onSubmit}>
            <Typography tag='h1' size="4xl" className="mb-12">promitor</Typography>
            <Input
                label='Email'
                placeholder='Your email here'
                className='mb-6'
                register={{ ...register('id', { required: 'This field is required' }) }}
                error={errors.id?.message}
            />
            <Input
                label='Password'
                type='password'
                placeholder='Enter your password'
                className='mb-6'
                register={{ ...register('password', { required: 'This field is required' }) }}
                error={errors.password?.message}
            />
            <Alert message={alert} className='mb-6'></Alert>
            <Button className='w-full'>
                <span className='flex items-center justify-center gap-2'>
                    <LockClosedIcon className='w-5 h-5' />
                    <span>Sign In</span>
                </span>
            </Button>
        </form>
    )
}
