import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PaginationLinks } from '@/components/pagination-links';
import { Head, Link, usePage } from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { LucideCirclePlus } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { UserDesktopTable, UserMobileList, UserIndexPageProps } from '@/features/user';

export default function UserIndexPage({ users }: UserIndexPageProps) {
    const authUser = usePage().props.auth.user;

    return (
        <>
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
                    <Card className="">
                        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div className="text-start w-full">
                                <CardTitle>Users</CardTitle>
                                <CardDescription>Manage users and their roles</CardDescription>
                            </div>
                            <Link
                                as="button"
                                href={route('users.create')}
                                className={cn(buttonVariants({ variant: 'primary' }), 'w-fit text-nowrap self-end md:self-auto')}
                            >
                                <LucideCirclePlus />
                                Create User
                            </Link>
                        </CardHeader>
                        <CardBody className="px-0">
                            <div className="hidden md:block">
                                <UserDesktopTable users={users.data} authUserId={authUser.id} />
                            </div>

                            <div className="block md:hidden">
                                <UserMobileList users={users.data} authUserId={authUser.id} />
                            </div>
                        </CardBody>
                        <CardFooter className="flex justify-center">
                            <PaginationLinks paginator={users} />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
}

UserIndexPage.layout = (page: any) => {
    return (
        <AuthenticatedLayout header={<Heading size="sm">Users</Heading>} breadcrumbs={[{ label: 'Users' }]}>
            {page}
        </AuthenticatedLayout>
    );
};
