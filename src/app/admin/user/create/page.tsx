import { Input } from '@/components/shared/Form'
import { ClockIcon } from '@heroicons/react/24/solid'
import React from 'react'

export default function CreateUser() {
    return (
        <div>
            <Input
                label='Full name'
                placeholder='Input full name'
                className='mb-6'
                icon={<ClockIcon className='w-5 h-5'/>}
            ></Input>
        </div>
    )
}
