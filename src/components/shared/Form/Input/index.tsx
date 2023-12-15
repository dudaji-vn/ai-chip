import { useId } from "react"
import { twMerge } from "tailwind-merge";
interface Props {
    label?: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'email';
    className?: string;
    icon?: React.ReactNode;
}

export const Input = ({ label, placeholder, className, type = 'text', icon} : Props) => {
    const idField = useId();
    return (
        <div className={twMerge('w-full', className)}>
            {label && <label htmlFor={idField} className="w-full block mb-2 text-sm font-medium">{label}</label>}
            <div className="bg-gray-700 border text-gray-400 border-gray-600 w-full rounded-md overflow-hidden flex justify-center items-center gap-[10px] px-4 py-3 ">
                {icon && <div>{icon}</div>}
                <input 
                    id={idField} 
                    className="flex-1 outline-none w-full bg-inherit" 
                    type={type}
                    placeholder={placeholder}/>
            </div>
        </div>
    )
} 