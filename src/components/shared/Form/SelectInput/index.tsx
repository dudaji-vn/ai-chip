'use client'

import Select from 'react-select';

const colourOptions = [
    { value: 'ocean', label: 'Ocean' },
    { value: 'blue', label: 'Blue' },
    { value: 'purple', label: 'Purple' },
    { value: 'red', label: 'Red' },
]

export const SelectInput = () => {

    return (
        <>
            <Select
                className='select-input'
                classNamePrefix="select"
                placeholder={
                    <div className=''>Last modified</div>
                }
                // defaultValue={colourOptions[0]}
                isDisabled={false}
                isLoading={false}
                isClearable={true}
                name="color"
                options={colourOptions}
                formatOptionLabel={({ value, label })=>(
                    <div className='cursor-pointer w-full h-full py-1 text-sm'>
                        <div>{label}</div>
                    </div>
                )}
            />
        </>
    )
}
