'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, memo, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

import { SIDEBAR_ITEMS } from '@/core/constant';
import { SidebarItem } from '@/core/interfaces';

export default memo(function LeftSidebar() {
    return (
        <aside className={twMerge('p-[10px] border-r border-gray-700 z-10 transition-all duration-200 fixed top-[80px] left-0 bottom-0 sidebar bg-gray-900')}>
            {SIDEBAR_ITEMS.map((item) =>
                <MenuItem key={item.text} item={item}/>
            )}
        </aside>
    );
})

const MenuItem = ( { item } : { item: SidebarItem}) => {
    const [isOpenChildren, setIsOpenChildren] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const pathname = usePathname();
    const { icon, text, link, children, patterns } = item;

    const toggleChildrent = () => {
        setIsOpenChildren(!isOpenChildren);
    }

    let Tag: any = 'div';
    let props = {};

    if(link) {
        Tag = Link;
        props = { href: link }
    }
    
    if(children && children.length > 0) {
        Tag = 'div';
        props = { onClick: toggleChildrent }
    }
    const isHaveChildren = children && children.length > 0;

    useEffect(() => {
        let isItemActive = false;
        if (pathname && patterns) {
            patterns?.map(pattern => {
                if (new RegExp(pattern).test(pathname)) {
                    isItemActive = true
                }
            })
        }
        setIsActive(isItemActive);
    }, [pathname, patterns])

    return (
        <Fragment>
            <Tag {...props} className={
                twMerge(
                    'cursor-pointer p-2 flex items-center justify-start gap-3 text-gray-400 transition-all rounded-sm hover:text-white hover:bg-gray-700 text-base overflow-hidden', 
                    children && children?.length > 0 ? 'mb-[6px]' : 'mb-3',
                    isActive ? ' text-white bg-gray-700' : ''
                )
            }>
                {icon ? <div className='w-6 h-6'>{icon}</div> : null}
                <div 
                    className="flex-1 whitespace-nowrap flex items-center justify-center">
                        <span className='flex-1'>{text}</span>
                        {isHaveChildren && (
                            <ChevronDownIcon className={`w-5 h-5 transition-all ${isOpenChildren ? "rotate-180" : ""}`}/>
                        )}
                </div>
            </Tag>
            {isHaveChildren && isOpenChildren && (
                <div className='pl-9 sidebar-sub-item'>
                    {children.map((item, _) => 
                        <MenuItem key={item.text} item={item} />
                    )}
                </div>
            )}
        </Fragment>
    )
}