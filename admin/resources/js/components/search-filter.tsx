import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Input } from "@/components/ui/input";
import { Search, X } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';

interface FilterOption {
    value: string;
    label: string;
}

interface SearchAndFilterProps {
    // URL and routing
    route: string; // e.g., '/staff-users'

    // Current filter values from URL
    currentFilters: {
        search?: string;
        status?: string;
        per_page?: string;
        [key: string]: any; // Allow additional filters
    };

    searchPlaceholder?: string;
    perPageOptions?: FilterOption[];
    statusOptions?: FilterOption[];
    additionalFilters?: {
        key: string;
        label: string;
        options: FilterOption[];
        placeholder?: string;
        width?: string;
    }[];

    className?: string;
    showActiveFilters?: boolean;

    onFiltersChange?: (filters: any) => void;
}

const defaultPerPageOptions: FilterOption[] = [
    { value: '10', label: 'Show 10' },
    { value: '20', label: 'Show 20' },
    { value: '50', label: 'Show 50' },
    { value: '100', label: 'Show 100' },
];

const defaultStatusOptions: FilterOption[] = [
    { value: 'all', label: 'All' },
    { value: '1', label: 'Active' },
    { value: '0', label: 'Inactive' },
];

export default function SearchAndFilter({
    route,
    currentFilters,
    searchPlaceholder = "Search...",
    perPageOptions = defaultPerPageOptions,
    statusOptions = defaultStatusOptions,
    additionalFilters = [],
    className = "",
    showActiveFilters = true,
    onFiltersChange
}: SearchAndFilterProps) {
    // Local state for form inputs
    const [searchTerm, setSearchTerm] = useState(currentFilters?.search || '');
    const [selectedStatus, setSelectedStatus] = useState(currentFilters?.status || 'all');
    const [selectedPerPage, setSelectedPerPage] = useState(currentFilters?.per_page || '10');
    const [additionalFilterValues, setAdditionalFilterValues] = useState<Record<string, string>>({});

    // Track if this is the initial load
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Initialize additional filter values
    useEffect(() => {
        const initialValues: Record<string, string> = {};
        additionalFilters.forEach(filter => {
            initialValues[filter.key] = currentFilters[filter.key] || filter.options[0]?.value || '';
        });
        setAdditionalFilterValues(initialValues);
    }, [additionalFilters, currentFilters]);

    // Only trigger search after initial load is complete
    useEffect(() => {
        if (isInitialLoad) {
            setIsInitialLoad(false);
            return;
        }

        const timeoutId = setTimeout(() => {
            handleSearch(true);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, selectedStatus, selectedPerPage, additionalFilterValues]);

    // Sync local state with URL parameters on page load
    useEffect(() => {
        setSearchTerm(currentFilters?.search || '');
        setSelectedStatus(currentFilters?.status || 'all');
        setSelectedPerPage(currentFilters?.per_page || '10');
    }, [currentFilters]);

    const handleSearch = (resetPage = true) => {
        const params: any = {};

        if (searchTerm.trim()) {
            params.search = searchTerm.trim();
        }

        if (selectedStatus !== 'all') {
            params.status = selectedStatus;
        }

        if (selectedPerPage !== '10') {
            params.per_page = selectedPerPage;
        }

        // Add additional filters
        Object.entries(additionalFilterValues).forEach(([key, value]) => {
            const filter = additionalFilters.find(f => f.key === key);
            const defaultValue = filter?.options[0]?.value || 'all';
            if (value && value !== defaultValue) {
                params[key] = value;
            }
        });

        if (resetPage) {
            params.page = 1;
        }

        // Call optional callback
        if (onFiltersChange) {
            onFiltersChange(params);
        }

        router.get(route, params, {
            preserveState: true,
            preserveScroll: true,
            only: ['staff', 'data'], // Adjust based on your data key
        });
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setSelectedStatus('all');
        setSelectedPerPage('10');

        // Reset additional filters
        const resetValues: Record<string, string> = {};
        additionalFilters.forEach(filter => {
            resetValues[filter.key] = filter.options[0]?.value || '';
        });
        setAdditionalFilterValues(resetValues);

        if (onFiltersChange) {
            onFiltersChange({});
        }

        router.get(route, {}, {
            preserveState: true,
            preserveScroll: true,
            only: ['staff', 'data'],
        });
    };

    const handleStatusChange = (value: string) => {
        setSelectedStatus(value);
    };

    const handlePerPageChange = (value: string) => {
        setSelectedPerPage(value);
    };

    const handleAdditionalFilterChange = (key: string, value: string) => {
        setAdditionalFilterValues(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const hasActiveFilters = searchTerm ||
        selectedStatus !== 'all' ||
        selectedPerPage !== '10' ||
        Object.entries(additionalFilterValues).some(([key, value]) => {
            const filter = additionalFilters.find(f => f.key === key);
            const defaultValue = filter?.options[0]?.value || '';
            return value !== defaultValue;
        });

    const getStatusLabel = (value: string) => {
        return statusOptions.find(option => option.value === value)?.label || value;
    };

    const getAdditionalFilterLabel = (key: string, value: string) => {
        const filter = additionalFilters.find(f => f.key === key);
        return filter?.options.find(option => option.value === value)?.label || value;
    };

    return (
        <div className={className}>
            <div className="flex mt-3 gap-2">
                {/* Per Page Selector */}
                <div className="flex-none">
                    <Select value={selectedPerPage} onValueChange={handlePerPageChange}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Pagination" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Records per page</SelectLabel>
                                {perPageOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Status Selector */}
                <div className="flex-none">
                    <Select value={selectedStatus} onValueChange={handleStatusChange}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                {statusOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Additional Filters */}
                {additionalFilters.map((filter) => (
                    <div key={filter.key} className="flex-none">
                        <Select
                            value={additionalFilterValues[filter.key] || filter.options[0]?.value || ''}
                            onValueChange={(value) => handleAdditionalFilterChange(filter.key, value)}
                        >
                            <SelectTrigger className={filter.width || "w-[120px]"}>
                                <SelectValue placeholder={filter.placeholder || filter.label} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>{filter.label}</SelectLabel>
                                    {filter.options.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                ))}

                {/* Search Input */}
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <Input
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch(true)}
                                className="pr-8"
                            />
                            {searchTerm && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                                    onClick={() => setSearchTerm('')}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            )}
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleSearch(true)}
                            className="flex-none"
                        >
                            <Search className="h-4 w-4" />
                        </Button>
                        {hasActiveFilters && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClearSearch}
                                className="flex-none"
                            >
                                Clear
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Active Filters Display */}
            {showActiveFilters && hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mt-3">
                    {searchTerm && (
                        <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                            Search: "{searchTerm}"
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 hover:bg-blue-200"
                                onClick={() => setSearchTerm('')}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    )}
                    {selectedStatus !== 'all' && (
                        <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">
                            Status: {getStatusLabel(selectedStatus)}
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 hover:bg-green-200"
                                onClick={() => setSelectedStatus('all')}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    )}
                    {Object.entries(additionalFilterValues).map(([key, value]) => {
                        const filter = additionalFilters.find(f => f.key === key);
                        const defaultValue = filter?.options[0]?.value || '';
                        if (value && value !== defaultValue) {
                            return (
                                <div key={key} className="flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-sm">
                                    {filter?.label}: {getAdditionalFilterLabel(key, value)}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="h-4 w-4 p-0 hover:bg-purple-200"
                                        onClick={() => handleAdditionalFilterChange(key, defaultValue)}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            )}
        </div>
    );
}