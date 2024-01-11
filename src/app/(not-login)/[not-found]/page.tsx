'use client'

import Button from '@/components/shared/button'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function PageNotFound() {
    const router = useRouter()
    const backToHome = () => {
        router.push('/')
    }
  return (
    <div className='flex flex-col gap-4'>
        <p>Page Not Found</p>
        <Button onClick={backToHome}>
            <span>Back to Home</span>
        </Button>
    </div>
  )
}
