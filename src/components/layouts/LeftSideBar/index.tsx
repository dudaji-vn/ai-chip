'use client'

import Link from 'next/link';
import { Fragment, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

import { StoreName } from '@/core/enums/store.enum';
import { useAppSelector } from '@/stores';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { SIDEBAR_ITEMS } from '@/core/constant';
import { SidebarItem } from '@/core/interfaces';
import { usePathname } from 'next/navigation';

export default function LeftSidebar() {
    const isOpenSidebar = useAppSelector(state => state[StoreName.GLOBAL_STORE].isOpenSidebar)

    const listVariants = {
		collapse: { width: 60 },
		expand: { width: 225, transition: { staggerChildren: 0.2 }}
	};
    

    return (
        <motion.aside className={
            twMerge('bg-gray-800 p-[10px] border-r border-gray-700 z-10 transition-all sticky top-[80px] left-0 bottom-0')} 
            variants={listVariants}
            animate={isOpenSidebar ? "expand" : "collapse"}
        >
            {SIDEBAR_ITEMS.map((item) =>
                <MenuItem key={item.text} item={item}/>
            )}
        </motion.aside>
    );
}

const MenuItem = ( { item } : { item: SidebarItem}) => {
    const isOpenSidebar = useAppSelector(state => state[StoreName.GLOBAL_STORE].isOpenSidebar)
    const [isOpenChildren, setIsOpenChildren] = useState(false);
    const pathname = usePathname();
    const { icon, text, link, children } = item;

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
    const variantsItem = {
        collapse: { opacity: 0, width: 0, y: 6, display: 'none' }, 
        expand: { opacity: 1, width: 152, transition: { delay: 0.5 }, y: 0, display: 'flex' }
    }
    return (
        <Fragment>
            <Tag {...props} className={
                twMerge(
                    'cursor-pointer p-2 flex items-center justify-start gap-3 text-gray-400 transition-all rounded-sm hover:text-white hover:bg-gray-700 text-base overflow-hidden', 
                    children && children?.length > 0 ? 'mb-[6px]' : 'mb-3',
                    isOpenSidebar ? 'flex' : 'block',
                    pathname === link ? 'bg-gray-700 text-blue-400' : ''
                )
            }>
                {icon ? <div className='w-6 h-6'>{icon}</div> : null}
                {<motion.div 
                    variants={variantsItem}
                    transition={{ease: "easeOut", duration: 0.5}}
                    className="flex-1 whitespace-nowrap flex items-center justify-center">
                        <span className='flex-1'>{text}</span>
                        {isHaveChildren && (
                            <ChevronDownIcon className={`w-5 h-5 transition-all ${isOpenChildren ? "rotate-180" : ""}`}/>
                        )}
                </motion.div>}
            </Tag>
            {isHaveChildren && isOpenChildren && (
                <div className='pl-9'>
                    {children.map((item, index) => 
                        <MenuItem key={item.text} item={item} />
                    )}
                </div>
            )}
        </Fragment>
    )
}