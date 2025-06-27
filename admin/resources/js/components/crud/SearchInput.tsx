import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Search, X } from 'lucide-react';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
    placeholder?: string;
    className?: string;
}

export function SearchInput({
                                value,
                                onChange,
                                onSearch,
                                placeholder = "Search...",
                                className = "flex-1"
                            }: SearchInputProps) {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <div className={className}>
            <div className="flex items-center gap-2">
                <div className="relative flex-1">
                    <Input
                        type="text"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pr-8"
                    />
                    {value && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => onChange('')}
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    )}
                </div>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onSearch}
                    className="flex-none"
                >
                    <Search className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
