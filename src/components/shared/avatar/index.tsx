import Image from 'next/image';
import { twMerge } from 'tailwind-merge'

interface Props {
    className?: string;
    src: string;
    alt: string;
}
export default function Avatar({ className, src, alt } : Props) {
    const basePath = process.env.BASE_PATH || ''; // Fallback to empty string if not defined
    const imageUrl = src ? src : `${basePath}/images/avatar.png`;

    return (
        <div className={twMerge('relative rounded-full overflow-hidden w-8 h-8 cursor-pointer', className)}>
            <Image
                src={imageUrl}
                alt={alt || 'Avatar'}
                fill
                sizes='100%'
                className='absolute'
            ></Image>
        </div>
    )
}
