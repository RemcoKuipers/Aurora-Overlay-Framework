interface PropertyLabelProps {
    label: string;
    description?: string;
}

export function PropertyLabel({
                                  label,
                                  description,
                              }: PropertyLabelProps) {
    return (
        <span className="property-label">
            {label}

            {description && (
                <span
                    className="property-info"
                    title={description}
                    aria-label={`${label}: ${description}`}
                    tabIndex={0}
                >
                    ⓘ
                </span>
            )}
        </span>
    );
}