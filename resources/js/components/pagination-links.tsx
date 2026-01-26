import {
    Pagination,
    PaginationButton,
    PaginationItem,
    PaginationList,
} from '@/components/ui/pagination';
import { router } from '@inertiajs/react';
import {
    LucideChevronLeft,
    LucideChevronRight,
    LucideChevronsLeft,
    LucideChevronsRight,
} from 'lucide-react';

interface Link {
    url: string | null;
    label: string;
    active: boolean;
}

interface Paginator {
    links: Link[];
    first_page_url: string;
    last_page_url: string;
    current_page: number;
    last_page: number;
}

interface PaginationLinksProps {
    paginator: Paginator;
}

export function PaginationLinks({ paginator }: PaginationLinksProps) {
    if (paginator.links.length <= 3) return null;

    const handlePageChange = (url: string | null) => {
        if (url) {
            router.get(url, {}, { preserveState: true, preserveScroll: true });
        }
    };

    return (
        <Pagination className="mt-4">
            <PaginationList>
                <PaginationItem>
                    <PaginationButton
                        onClick={() => handlePageChange(paginator.first_page_url)}
                        disabled={paginator.current_page === 1}
                        render={
                            <button>
                                <LucideChevronsLeft className="size-4" />
                                <span className="sr-only">First</span>
                            </button>
                        }
                    />
                </PaginationItem>

                {paginator.links.map((link, key) => {
                    let label = link.label;
                    let icon = null;
                    let isNavButton = false;

                    // Handle Previous/Next labels with icons
                    if (link.label.includes('Previous')) {
                        icon = <LucideChevronLeft className="size-4" />;
                        label = 'Previous';
                        isNavButton = true;
                    } else if (link.label.includes('Next')) {
                        icon = <LucideChevronRight className="size-4" />;
                        label = 'Next';
                        isNavButton = true;
                    }

                    // Render ellipsis (hide on mobile)
                    if (link.label === '...') {
                        return (
                            <PaginationItem key={key} className="hidden sm:block">
                                <span className="px-3 py-2 text-muted-foreground">...</span>
                            </PaginationItem>
                        );
                    }

                    // Hide numbered page buttons on mobile, keep only prev/next
                    const isPageNumber = !link.label.includes('Previous') && !link.label.includes('Next');

                    return (
                        <PaginationItem key={key} className={isPageNumber ? 'hidden sm:block' : ''}>
                            <PaginationButton
                                active={link.active}
                                disabled={!link.url}
                                onClick={() => handlePageChange(link.url)}
                                render={
                                    <button>
                                        {link.label.includes('Next') ? (
                                            <>
                                                <span className={isNavButton ? 'hidden sm:inline' : ''} dangerouslySetInnerHTML={{ __html: label }} />
                                                {icon}
                                            </>
                                        ) : (
                                            <>
                                                {icon}
                                                <span className={isNavButton ? 'hidden sm:inline' : ''} dangerouslySetInnerHTML={{ __html: label }} />
                                            </>
                                        )}
                                    </button>
                                }
                            />
                        </PaginationItem>
                    );
                })}

                <PaginationItem>
                    <PaginationButton
                        onClick={() => handlePageChange(paginator.last_page_url)}
                        disabled={paginator.current_page === paginator.last_page}
                        render={
                            <button>
                                <span className="sr-only">Last</span>
                                <LucideChevronsRight className="size-4" />
                            </button>
                        }
                    />
                </PaginationItem>
            </PaginationList>
        </Pagination>
    );
}
