import Image from 'next/image';
import { twMerge } from 'tailwind-merge'

interface Props {
    className?: string;
    src: string;
    alt: string;
}
export default function Avatar({ className, src, alt } : Props) {

    return (
        <div className={twMerge('relative rounded-full overflow-hidden w-8 h-8 cursor-pointer', className)}>
            <Image
                src={src || '/images/avatar.png'}
                alt={alt || 'Avatar'}
                fill
            ></Image>
        </div>
    )
}
