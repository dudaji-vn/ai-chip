import { EyeSlashIcon } from "@heroicons/react/24/solid";
import { EyeIcon } from "@heroicons/react/24/solid";
import { useId, useState } from "react"
import { twMerge } from "tailwind-merge";

interface Props {
    label?: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'email';
    className?: string;
    icon?: React.ReactNode;
    error?: string;
    register?: any;
    [key: string]: any;
}

export const Input = ({ label, placeholder, className, type = 'text', icon, error , register} : Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const idField = useId();
    return (
        <div className={twMerge('w-full', className)}>
            {label && <label htmlFor={idField} className="w-full block mb-2 text-sm font-medium text-left">{label}</label>}
            <div className={twMerge("bg-gray-700 border text-gray-400 border-gray-600 w-full rounded-sm overflow-hidden flex justify-center items-center gap-[10px] p-3", error ? "text-red-500 border-red-500" : "")}>
                {icon && <div>{icon}</div>}
                <input 
                    id={idField}
                    {...register }
                    className={twMerge("flex-1 outline-none w-full bg-inherit text-sm", error ? ' placeholder-red-500' : '')}
                    type={type === 'password' && showPassword ? 'text' : type}
                    placeholder={placeholder}/>
                {type === 'password' && showPassword && <EyeIcon className="w-5 h-5 cursor-pointer text-gray-400" onClick={() => setShowPassword(false)} />}
                {type === 'password' && !showPassword && <EyeSlashIcon className="w-5 h-5 cursor-pointer text-gray-400" onClick={() => setShowPassword(true)} />}
            </div>
            {error && <p className="text-sm text-red-500 text-left font-normal mt-2">{error}</p>}
        </div>
    )
} 