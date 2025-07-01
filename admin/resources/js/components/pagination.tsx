import { ChevronLeft, ChevronRight } from 'lucide-react';
import { router } from '@inertiajs/react';
import { PaginatedData } from '@/types';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
} from "@/components/ui/pagination";

interface PaginationLinkData {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps<T> {
    pagination: PaginatedData<T>;
    filters?: Record<string, any>; // e.g. { search, status, per_page }
}

export default function PaginationComponent<T>({
                                                   pagination,
                                                   filters = {}
                                               }: PaginationProps<T>) {
    const handlePageClick = (url: string | null) => {
        if (!url) return;

        router.get(url, filters, {
            preserveScroll: true,
            preserveState: true,
            only: ['categories'], // You can adjust this to match the data you want to preserve
        });
    };

    const filteredLinks = pagination.links.filter(
        (link) => !['Next &raquo;', '&laquo; Previous'].includes(link.label)
    );

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous */}
                <PaginationItem>
                    <button
                        onClick={() => handlePageClick(pagination.prev_page_url)}
                        disabled={!pagination.prev_page_url}
                        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ${
                            !pagination.prev_page_url ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </button>
                </PaginationItem>

                {/* Page Numbers */}
                {filteredLinks.map((link, index) => {
                    if (link.label === '...') {
                        return (
                            <PaginationItem key={`ellipsis-${index}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={`page-${link.label}`}>
                            <button
                                onClick={() => handlePageClick(link.url)}
                                disabled={!link.url}
                                className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ${
                                    link.active
                                        ? 'bg-primary text-primary-foreground hover:bg-primary/80'
                                        : ''
                                } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        </PaginationItem>
                    );
                })}

                {/* Next */}
                <PaginationItem>
                    <button
                        onClick={() => handlePageClick(pagination.next_page_url)}
                        disabled={!pagination.next_page_url}
                        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ${
                            !pagination.next_page_url ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
