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
    { value: "all", label: "All" },
    { value: "1", label: "Active" },
    { value: "0", label: "Inactive" },
];

export default function StatusSelect({ value, onValueChange, placeholder = "Status", width = "w-[120px]", label = "Status", options = defaultStatusOptions, disabled = false, className = "" } : StatusSelectProps) {
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