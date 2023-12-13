import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export default function Breadcrumb() {
    return (
        <div className='flex-1 text-gray-400 hidden md:flex items-center justify-start gap-4 text-sm font-medium leading-normal'>
            <div className='hover:text-white transition-all cursor-pointer'>
                <HomeIcon className="h-5 w-5 " />
            </div>
            <Link href="/" className='text-inherit hover:text-white transition-all'>Cluster overview</Link>
            <p><ChevronRightIcon className='h-5 w-5 text-inherit'/></p>
            <Link href="/" className='text-inherit hover:text-white transition-all'>Server</Link>
            <p><ChevronRightIcon className='h-5 w-5 text-inherit'/></p>
            <p>Test</p>
        </div>
    )
}
