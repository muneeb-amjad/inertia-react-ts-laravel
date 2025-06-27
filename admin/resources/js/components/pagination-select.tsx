import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StatusOption {
    value: string;
    label: string;
}

interface StatusSelectProps {
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    width?: string;
    label?: string;
    options?: StatusOption[];
    disabled?: boolean;
    className?: string;
}

const defaultStatusOptions: StatusOption[] = [
    { value: "10", label: "Show 10 Record" },
    { value: "20", label: "Show 20 Record" },
    { value: "50", label: "Show 50 Record" },
    { value: "100", label: "Show 100 Record" },
];

export default function PaginationSelect({ value, onValueChange, placeholder = "Status", width = "w-[120px]", label = "Status", options = defaultStatusOptions, disabled = false, className = "" } : StatusSelectProps) {
    return (
        <Select value={value} onValueChange={onValueChange} disabled={disabled}>
            <SelectTrigger className={`${width} ${className}`}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}