import { twMerge } from 'tailwind-merge'
import Typography from '../../typography';

interface Props {
    className?: string;
    title: string;
    children: React.ReactNode;
}
export function BlockDataWrapper({ className, title, children }: Props) {
    return (
        <section className={twMerge('bg-gray-800 p-2 rounded-sm flex flex-col items-center gap-4', className)}>
            <Typography tag='h3' size='md' className='my-1 text-white text-center font-semibold'>{title}</Typography>
            {children}
        </section>
    )
}
