// src/components/common/AsyncSelect.tsx
import React, { useEffect, useState } from "react";

// Зроби універсальний тип опції
export interface OptionType {
    id: string;
    name?: string;
    title?: string;
}

// Оголоси пропси
interface AsyncSelectProps {
    label: string;
    value: string | string[] | undefined;
    onChange: (value: string | string[]) => void;
    fetchOptions: () => Promise<OptionType[]>;
    multiple?: boolean;
}

export default function AsyncSelect({
                                        label,
                                        value,
                                        onChange,
                                        fetchOptions,
                                        multiple = false,
                                    }: AsyncSelectProps) {
    const [options, setOptions] = useState<OptionType[]>([]);

    useEffect(() => {
        fetchOptions().then(setOptions);
    }, [fetchOptions]);

    return (
        <div>
            <label>{label}</label>
            <select
                multiple={multiple}
                value={value}
                onChange={e => {
                    if (multiple) {
                        const selected = Array.from(e.target.selectedOptions).map(
                            o => o.value
                        );
                        onChange(selected);
                    } else {
                        onChange(e.target.value);
                    }
                }}
            >
                <option value="">--</option>
                {options.map(opt => (
                    <option key={opt.id} value={opt.id}>
                        {opt.name || opt.title}
                    </option>
                ))}
            </select>
        </div>
    );
}

