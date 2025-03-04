import { MultiSelect } from '@mantine/core';
import { useRef, useState } from 'react';

const largeData = ['1', '2', '3', '4'];

export default function Index() {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const myRef = useRef(null);
    const handleChange = (value: any) => {
        console.log('currVal: ', value)
        setSelectedValues(value);
    };

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && event.target.value) {
            const newValue = event.target.value.trim();
            // Check if the new value is not already in the selected values
            if (!selectedValues.includes(newValue)) {
                setSelectedValues((prev) => [...prev, newValue]);
                (myRef as any).current.value = "";
            }
            event.preventDefault(); // Prevent form submission
        }
    };

    return (
        <div className='w-48'>
            <MultiSelect
                key={selectedValues.length}
                ref={myRef}
                classNames={{ dropdown: 'hidden' }}
                className='w-full'
                label="100 000 options autocomplete"
                placeholder="Use limit to optimize performance"
                data={largeData}
                searchable
                value={selectedValues}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}