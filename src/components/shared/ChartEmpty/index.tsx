import Image from 'next/image'
import React from 'react'

export default function ChartEmpty() {
    return (
        <div className='flex flex-col items-center'>
            <div className='relative w-full max-w-[396px] mb-8'>
                <Image
                    src='/images/chart_empty.svg'
                    alt='Chart Empty'
                    width={396}
                    height={396}
                />
            </div>
            <p className='mb-2 text-xl font-medium'>Empty data</p>
            <p className='text-gray-400'>This user doesn’t have any data to show</p>
        </div>
    )
}
