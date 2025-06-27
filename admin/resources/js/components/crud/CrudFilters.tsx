import { Button } from '@/components/ui/button';
import { SearchInput } from './SearchInput';
import { PerPageSelector } from './PerPageSelector';
import { StatusFilter } from './StatusFilter';
import { FilterTags } from './FilterTags';

interface FilterConfig {
    search?: {
        enabled: boolean;
        placeholder?: string;
    };
    perPage?: {
        enabled: boolean;
        options?: number[];
    };
    status?: {
        enabled: boolean;
        options?: Array<{ value: string; label: string }>;
        label?: string;
        placeholder?: string;
    };
}

interface CrudFiltersProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    perPageValue: string;
    onPerPageChange: (value: string) => void;
    statusValue?: string;
    onStatusChange?: (value: string) => void;
    onSearch: () => void;
    onClear: () => void;
    hasActiveFilters: boolean;
    filterTags: Array<{
        key: string;
        label: string;
        value: string;
        onRemove: () => void;
        colorClass?: string;
    }>;
    config?: FilterConfig;
    className?: string;
}

export function CrudFilters({
                                searchValue,
                                onSearchChange,
                                perPageValue,
                                onPerPageChange,
                                statusValue = 'all',
                                onStatusChange,
                                onSearch,
                                onClear,
                                hasActiveFilters,
                                filterTags,
                                config = {
                                    search: { enabled: true },
                                    perPage: { enabled: true },
                                    status: { enabled: false }
                                },
                                className = "mt-3"
                            }: CrudFiltersProps) {
    return (
        <div className={className}>
            <div className="flex gap-2">
                {config.perPage?.enabled && (
                    <PerPageSelector
                        value={perPageValue}
                        onChange={onPerPageChange}
                        options={config.perPage.options}
                    />
                )}

                {config.status?.enabled && onStatusChange && (
                    <StatusFilter
                        value={statusValue}
                        onChange={onStatusChange}
                        options={config.status.options}
                        label={config.status.label}
                        placeholder={config.status.placeholder}
                    />
                )}

                {config.search?.enabled && (
                    <SearchInput
                        value={searchValue}
                        onChange={onSearchChange}
                        onSearch={onSearch}
                        placeholder={config.search.placeholder}
                    />
                )}

                {hasActiveFilters && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClear}
                        className="flex-none"
                    >
                        Clear
                    </Button>
                )}
            </div>

            <FilterTags tags={filterTags} />
        </div>
    );
}
