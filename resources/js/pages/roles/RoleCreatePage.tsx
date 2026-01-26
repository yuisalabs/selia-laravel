import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { FormEventHandler } from 'react';
import { LucideCircleX, LucideSave } from 'lucide-react';
import { Item } from '@/components/ui/item';
import { Textarea } from '@/components/ui/textarea';
import { Heading } from '@/components/ui/heading';

interface Permission {
    id: number;
    name: string;
    description: string | null;
}

interface RoleCreatePageProps {
    permissions: Permission[];
}

export default function RoleCreatePage({ permissions }: RoleCreatePageProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        guard_name: 'web',
        permissions: [] as number[],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('roles.store'));
    };

    const togglePermission = (permissionId: number) => {
        if (data.permissions.includes(permissionId)) {
            setData('permissions', data.permissions.filter(id => id !== permissionId));
        } else {
            setData('permissions', [...data.permissions, permissionId]);
        }
    };

    return (
        <>
            <Head title="Create Role" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Role</CardTitle>
                            <CardDescription>
                                Create a new role and assign permissions
                            </CardDescription>
                        </CardHeader>
                        <CardBody>
                            <form onSubmit={submit} className="space-y-6">
                                <Field invalid={!!errors.name}>
                                    <FieldLabel htmlFor="name">Name</FieldLabel>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        autoFocus
                                        placeholder="Enter role name"
                                    />
                                    <FieldError match={!!errors.name}>{errors.name}</FieldError>
                                </Field>

                                <Field invalid={!!errors.description}>
                                    <FieldLabel htmlFor="description">Description (Optional)</FieldLabel>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Enter role description"
                                    />
                                    <FieldError match={!!errors.description}>{errors.description}</FieldError>
                                </Field>

                                <Field invalid={!!errors.guard_name}>
                                    <FieldLabel htmlFor="guard_name">Guard Name</FieldLabel>
                                    <Input
                                        id="guard_name"
                                        value={data.guard_name}
                                        onChange={(e) => setData('guard_name', e.target.value)}
                                        required
                                        placeholder="Enter guard name"
                                    />
                                    <FieldError match={!!errors.guard_name}>{errors.guard_name}</FieldError>
                                </Field>

                                <Item variant="plain" className="space-y-2 flex flex-col p-0">
                                    <label className="text-foreground flex items-center gap-3">Permissions</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                                        {permissions.map((permission) => (
                                            <div key={permission.id} className="flex items-start space-x-2 p-2">
                                                <Checkbox
                                                    id={`permission-${permission.id}`}
                                                    checked={data.permissions.includes(permission.id)}
                                                    onCheckedChange={() => togglePermission(permission.id)}
                                                    className="mt-1"
                                                />
                                                <div className="grid gap-1.5 leading-none">
                                                    <label
                                                        htmlFor={`permission-${permission.id}`}
                                                        className="text-sm font-medium leading-none cursor-pointer"
                                                    >
                                                        {permission.name}
                                                    </label>
                                                    {permission.description && (
                                                        <p className="text-xs text-muted-foreground">
                                                            {permission.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.permissions && (
                                        <p className="text-sm text-danger">{errors.permissions}</p>
                                    )}
                                </Item>

                                <div className="flex items-center gap-4">
                                    <Button variant="primary" type="submit" disabled={processing}>
                                        <LucideSave/>
                                        Create
                                    </Button>
                                    <Link
                                        as="button"
                                        href={route('roles.index')}
                                        className={cn(buttonVariants({ variant: 'outline' }))}
                                    >
                                        <LucideCircleX/>
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}

RoleCreatePage.layout = (page: any) => {
    return (
        <AuthenticatedLayout header={
            <Heading size="sm">Create Role</Heading>
        }>
            {page}
        </AuthenticatedLayout>
    );
};
