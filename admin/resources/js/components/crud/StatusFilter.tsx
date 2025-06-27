import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface StatusOption {
    value: string;
    label: string;
}

interface StatusFilterProps {
    value: string;
    onChange: (value: string) => void;
    options?: StatusOption[];
    label?: string;
    placeholder?: string;
    className?: string;
}

export function StatusFilter({
                                 value,
                                 onChange,
                                 options = [
                                     { value: 'all', label: 'All' },
                                     { value: '1', label: 'Active' },
                                     { value: '0', label: 'Inactive' }
                                 ],
                                 label = "Status",
                                 placeholder = "Status",
                                 className = "flex-none"
                             }: StatusFilterProps) {
    return (
        <div className={className}>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-[120px]">
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
        </div>
    );
}
