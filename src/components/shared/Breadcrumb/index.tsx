import { ROUTE } from '@/core/constant/route'
import { Breadcrumb } from '@/core/interfaces'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Breadcrumb() {
    const [breadcrumb, setBreadcrumb] = useState<Breadcrumb[]>([])
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        Object.keys(ROUTE).map((key) => {
            const route = ROUTE[key as keyof typeof ROUTE];
            if(route.path === pathname) {
                setBreadcrumb([...route.breadcrumb || []]);
            }
        })
    }, [pathname, router])

    return (
        <div className='flex-1 text-gray-400 hidden md:flex items-center justify-start gap-4 text-sm font-medium leading-normal'>
            <Link href='/' className='hover:text-white transition-all cursor-pointer text-inherit'>
                <HomeIcon className="h-5 w-5 text-inherit   " />
            </Link>
            {breadcrumb.map((item, index) => (
                <div key={index} className='flex items-center gap-2'>
                    <p><ChevronRightIcon className='h-5 w-5 text-inherit'/></p>
                    {item.path ? <Link href={item.path} className='text-inherit hover:text-white transition-all'>{item.label}</Link> : <p>{item.label}</p>}
                </div>
            ))}
        </div>
    )
}
