import { twMerge } from 'tailwind-merge';
import Typography from '../../typography';

interface Props {
    className?: string;
    data?: string | number;
    unit?: string;
    dataPrimary?: string;
}
export function BlockDataText({ className, data, unit, dataPrimary }: Props) {
    return (
        <div className={twMerge('p-2 w-full flex items-center flex-col', className)}>
            {data && <h4 className='text-4xl leading-none font-bold mb-1'>{data || '--'}</h4>}
            {dataPrimary && <h4 className='text-xl leading-none font-bold pb-4 pt-2  text-green-400'>{dataPrimary || '--'}</h4>}
            {unit && <Typography size="md">{unit}</Typography>}
        </div>
    )
}
