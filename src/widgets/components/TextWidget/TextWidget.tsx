import "./TextWidget.css";

interface TextWidgetProps {
    text: string;
}

export function TextWidget({ text }: TextWidgetProps) {
    return (
        <div className="text-widget">
            {text}
        </div>
    );
}