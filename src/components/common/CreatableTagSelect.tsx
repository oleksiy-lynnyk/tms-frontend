import React from 'react'
import CreatableSelect from 'react-select/creatable'
import type { OnChangeValue } from 'react-select'

export interface Option {
    label: string
    value: string
}

interface Props {
    value: Option[]
    onChange: (opts: Option[]) => void
    placeholder?: string
}

const CreatableTagSelect: React.FC<Props> = ({
                                                 value,
                                                 onChange,
                                                 placeholder = 'Select or create tags…',
                                             }) => (
    <CreatableSelect
        isMulti
        options={[]}               // тут можна передати готові варіанти, якщо є
        value={value}
        onChange={(newVal: OnChangeValue<Option, true>) =>
            onChange(newVal as Option[])
        }
        placeholder={placeholder}
        formatCreateLabel={input => `Create tag "${input}"`}
        classNamePrefix="react-select"
        styles={{
            control: base => ({ ...base, minHeight: '38px' }),
            menu: base => ({ ...base, zIndex: 9999 }),
        }}
    />
)

export default CreatableTagSelect
