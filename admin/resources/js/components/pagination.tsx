import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

interface PaginationProps {
    current_page: number;
    data: any[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLinkData[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export default function PaginationComponent<T>({ pagination }: { pagination: PaginatedData<T> }) {
 
    const filteredLinks = pagination.links.filter(
        (link) => !['Next &raquo;', '&laquo; Previous'].includes(link.label)
    );

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <Link
                        href={pagination.prev_page_url ?? '#'}
                        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ${
                            !pagination.prev_page_url ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={(e) => {
                            if (!pagination.prev_page_url) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Link>
                </PaginationItem>

                {/* Page Number Links */}
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
                            <Link 
                                href={link.url ?? '#'}
                                className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ${
                                    link.active 
                                        ? 'bg-primary text-primary-foreground hover:bg-primary/80' 
                                        : ''
                                } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={(e) => {
                                    if (!link.url) {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                {link.label}
                            </Link>
                        </PaginationItem>
                    );
                })}

                {/* Next Page Link */}
                <PaginationItem>
                    <Link
                        href={pagination.next_page_url ?? '#'}
                        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ${
                            !pagination.next_page_url ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={(e) => {
                            if (!pagination.next_page_url) {
                                e.preventDefault();
                            }
                        }}
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}