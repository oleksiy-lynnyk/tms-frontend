// src/components/common/CreatableTagSelect.tsx
import React from 'react';
import CreatableSelect from 'react-select/creatable';

export type Option = {
    label: string;
    value: string;
};

interface Props {
    options?: Option[];
    value: Option[]; // додано для TS
    onChange: (value: Option[]) => void;
    placeholder?: string;
}

const CreatableTagSelect: React.FC<Props> = ({ options, value, onChange, placeholder }) => {
    return (
        <CreatableSelect
            isMulti
            options={options ?? []}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            formatCreateLabel={(input: string) => `Create tag "${input}"`}
            classNamePrefix="react-select"
            styles={{
                control: (base: any) => ({ ...base, minHeight: '38px' }),
                menu: (base: any) => ({ ...base, zIndex: 9999 }),
            }}
        />
    );
};

export default CreatableTagSelect;

