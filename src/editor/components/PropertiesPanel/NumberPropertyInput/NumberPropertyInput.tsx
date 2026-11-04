import { useEffect, useState } from "react";
import * as React from "react";
import "./NumberPropertyInput.css"

interface NumberPropertyInputProps {
    value: number;
    min?: number;
    max?: number;
    onChange: (value: number) => void;
}

export function NumberPropertyInput({
                                        value,
                                        min,
                                        max,
                                        onChange,
                                    }: NumberPropertyInputProps) {
    const [inputValue, setInputValue] = useState(String(value));

    useEffect(() => {
        setInputValue(String(value));
    }, [value]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newValue = event.target.value;

        setInputValue(newValue);

        if (newValue.trim() === "") {
            return;
        }

        const numericValue = Number(newValue);

        if (!Number.isFinite(numericValue)) {
            return;
        }

        if (min !== undefined && numericValue < min) {
            return;
        }

        if (max !== undefined && numericValue > max) {
            return;
        }

        onChange(numericValue);
    }

    function handleBlur() {
        setInputValue(String(value));
    }

    return (
        <input
            className="number-property-input"
            type="number"
            min={min}
            max={max}
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
        />
    );
}