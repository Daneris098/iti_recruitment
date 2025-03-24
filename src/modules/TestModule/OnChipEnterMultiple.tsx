import { MultiSelect } from '@mantine/core';
import { useState } from 'react';


export default function Index() {
    const multiSelectCount = 3; 
    const [selectedValues, setSelectedValues] = useState<string[][]>(new Array(multiSelectCount).fill([]) );

    const handleChange = (index: number, value: string[]) => {
        const newSelectedValues = [...selectedValues];
        newSelectedValues[index] = value;
        setSelectedValues(newSelectedValues);
    };

    const handleKeyDown = (index: number, event: any) => {
        if (event.key === 'Enter' && event.target.value) {
            const newValue = event.target.value.trim();
            const newSelectedValues = [...selectedValues];

            // Avoid adding the same value more than once
            if (!newSelectedValues[index].includes(newValue)) {
                newSelectedValues[index] = [...newSelectedValues[index], newValue];
                setSelectedValues(newSelectedValues);
            }

            event.preventDefault();
        }
    };

    return (
        <div className='w-48'>
            {Array.from({ length: multiSelectCount }, (_, index) => (
                <MultiSelect
                    // key={index}
                    classNames={{ dropdown: 'hidden' }}
                    className='w-full mb-4'
                    label={`MultiSelect ${index + 1}`}
                    placeholder="Use limit to optimize performance"
                    data={[]}
                    searchable
                    value={selectedValues[index]}
                    onChange={(value) => handleChange(index, value)}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                />
            ))}
        </div>
    );
}
