import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FilterTag {
    key: string;
    label: string;
    value: string;
    onRemove: () => void;
    colorClass?: string;
}

interface FilterTagsProps {
    tags: FilterTag[];
    className?: string;
}

export function FilterTags({ tags, className = "flex flex-wrap gap-2 mt-3" }: FilterTagsProps) {
    if (tags.length === 0) return null;

    return (
        <div className={className}>
            {tags.map((tag) => (
                <div
                    key={tag.key}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm ${
                        tag.colorClass || 'bg-blue-100 text-blue-800'
                    }`}
                >
                    {tag.label}: {tag.value}
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={`h-4 w-4 p-0 ${
                            tag.colorClass?.includes('blue') ? 'hover:bg-blue-200' :
                                tag.colorClass?.includes('green') ? 'hover:bg-green-200' :
                                    'hover:bg-blue-200'
                        }`}
                        onClick={tag.onRemove}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </div>
            ))}
        </div>
    );
}
