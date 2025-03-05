import { MultiSelect } from '@mantine/core';
import { useRef, useState } from 'react';


export default function Index() {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const myRef = useRef(null);
    const handleChange = (value: any) => {
        setSelectedValues(value);
    };

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && event.target.value) {
            const newValue = event.target.value.trim();
            if (!selectedValues.includes(newValue)) {
                setSelectedValues((prev) => [...prev, newValue]);
                (myRef as any).current.value = "";
            }
            event.preventDefault();
        }
    };

    return (
        <div className='w-48'>
            <MultiSelect
                ref={myRef}
                classNames={{ dropdown: 'hidden' }}
                className='w-full'
                label="100 000 options autocomplete"
                placeholder="Use limit to optimize performance"
                data={[]}
                searchable
                value={selectedValues}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}