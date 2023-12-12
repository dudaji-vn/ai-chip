import { twMerge } from 'tailwind-merge';
import Typography from '../../Typography';

interface Props {
    className?: string;
    data: string;
    unit: string;
}
export function BlockDataText({ className, data, unit }: Props) {
    return (
        <div className={twMerge('p-2 w-full flex items-center flex-col', className)}>
            <h4 className='text-4xl leading-none font-bold mb-1'>{data || '--'}</h4>
            <Typography size="md">{unit || '--'}</Typography>
        </div>
    )
}
