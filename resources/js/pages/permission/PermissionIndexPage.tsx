import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PaginationLinks } from '@/components/pagination-links';
import { Head, Link, router } from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { LucideCirclePlus, LucideSearch } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { PermissionDesktopTable, PermissionMobileList, PermissionIndexPageProps } from '@/features/permission';
import { Input } from '@/components/ui/input';
import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';

export default function PermissionIndexPage({ permissions, state }: PermissionIndexPageProps & { state?: { search?: string, sort?: string } }) {
    const { t } = useTranslation();
    const { search: currentSearch, sort } = state ?? { search: '', sort: '' };
    const [search, setSearch] = useState(currentSearch || '');

    // Debounce search
    const handleSearch = useCallback(
        debounce((value: string, currentSort: any) => {
            router.get(
                route('permissions.index'),
                { 
                    search: value,
                    sort: currentSort 
                },
                { preserveState: true, replace: true }
            );
        }, 300),
        []
    );

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        handleSearch(value, sort);
    };

    return (
        <>
            <Head title={t('permissions.title')} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div className="text-start w-full">
                                <CardTitle>{t('permissions.title')}</CardTitle>
                                <CardDescription>{t('permissions.description')}</CardDescription>
                            </div>
                            <div className="flex flex-col-reverse md:flex-row gap-4 w-full justify-end">
                                <div className="relative w-full md:w-64">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                                        <LucideSearch className="size-4" />
                                    </div>
                                    <Input
                                        placeholder={t('permissions.search_placeholder')}
                                        className="pl-9"
                                        value={search}
                                        onChange={onSearchChange}
                                    />
                                </div>
                                <Link
                                    as="button"
                                    href={route('permissions.create')}
                                    className={cn(buttonVariants({ variant: 'primary' }), 'w-fit text-nowrap self-end md:self-auto')}
                                >
                                    <LucideCirclePlus />
                                    {t('permissions.create')}
                                </Link>
                            </div>
                        </CardHeader>
                        <CardBody className="px-0">
                            <div className="hidden md:block">
                                <PermissionDesktopTable permissions={permissions.data} state={state} />
                            </div>

                            <div className="block md:hidden">
                                <PermissionMobileList permissions={permissions.data} />
                            </div>
                        </CardBody>
                        <CardFooter className="flex justify-center">
                            <PaginationLinks paginator={permissions} />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
}

const LinkLayout = ({ children }: { children: React.ReactNode }) => {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout header={<Heading size="sm">{t('permissions.title')}</Heading>} breadcrumbs={[{ label: t('permissions.title') }]}>
            {children}
        </AuthenticatedLayout>
    );
};

PermissionIndexPage.layout = (page: any) => <LinkLayout>{page}</LinkLayout>;
