import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface PerPageSelectorProps {
    value: string;
    onChange: (value: string) => void;
    options?: number[];
    className?: string;
}

export function PerPageSelector({
                                    value,
                                    onChange,
                                    options = [10, 20, 50, 100],
                                    className = "flex-none"
                                }: PerPageSelectorProps) {
    return (
        <div className={className}>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Pagination" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Records per page</SelectLabel>
                        {options.map((option) => (
                            <SelectItem key={option} value={option.toString()}>
                                Show {option}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
