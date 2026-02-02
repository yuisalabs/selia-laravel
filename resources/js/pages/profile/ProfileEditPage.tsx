import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from '../../features/profile/delete-user-form';
import UpdatePasswordForm from '../../features/profile/update-password-form';
import UpdateProfileInformationForm from '../../features/profile/update-profile-information-form';
import { Tabs, TabsItem, TabsList, TabsPanel } from '@/components/ui/tabs';
import { Fieldset } from '@/components/ui/fieldset';
import { Heading } from '@/components/ui/heading';

export default function ProfileEditPage({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <>
            <Head title="Profile" />

            <div className="py-12 px-6">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <Tabs defaultValue="profile" className="lg:w-6/12 w-full mx-auto">
                        <TabsList>
                            <TabsItem value="profile">Profile</TabsItem>
                            <TabsItem value="password">Password</TabsItem>
                            <TabsItem className="text-nowrap" value="delete-account">Delete Account</TabsItem>
                        </TabsList>
                        <TabsPanel value="profile">
                            <Fieldset>
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-full p-4 bg-card shadow sm:rounded-lg sm:p-8"
                                />
                            </Fieldset>
                        </TabsPanel>
                        <TabsPanel value="password">
                            <Fieldset>
                                <UpdatePasswordForm className="max-w-full p-4 bg-card shadow sm:rounded-lg sm:p-8" />
                            </Fieldset>
                        </TabsPanel>
                        <TabsPanel value="delete-account">
                            <Fieldset>
                                <DeleteUserForm className="max-w-full p-4 bg-card shadow sm:rounded-lg sm:p-8" />
                            </Fieldset>
                        </TabsPanel>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

ProfileEditPage.layout = (page: any) => {
    return (
        <AuthenticatedLayout
            header={<Heading size="sm">Profile</Heading>}
            breadcrumbs={[{ label: 'Profile' }]}
        >
            {page}
        </AuthenticatedLayout>
    );
};

