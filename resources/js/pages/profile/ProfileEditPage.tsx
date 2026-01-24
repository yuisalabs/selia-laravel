import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from '../../features/profile/delete-user-form';
import UpdatePasswordForm from '../../features/profile/update-password-form';
import UpdateProfileInformationForm from '../../features/profile/update-profile-information-form';
import { Tabs, TabsItem, TabsList, TabsPanel } from '@/components/ui/tabs';
import { Fieldset } from '@/components/ui/fieldset';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-foreground">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <Tabs defaultValue="profile" className="lg:w-6/12 w-full mx-auto">
                        <TabsList>
                            <TabsItem value="profile">Profile</TabsItem>
                            <TabsItem value="password">Password</TabsItem>
                            <TabsItem value="delete-account">Delete Account</TabsItem>
                        </TabsList>
                        <TabsPanel value="profile">
                            <Fieldset className="bg-card p-4 shadow sm:rounded-lg sm:p-8">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl"
                                />
                            </Fieldset>
                        </TabsPanel>
                        <TabsPanel value="password">
                            <Fieldset className="bg-card p-4 shadow sm:rounded-lg sm:p-8">
                                <UpdatePasswordForm className="max-w-xl" />
                            </Fieldset>
                        </TabsPanel>
                        <TabsPanel value="delete-account">
                            <Fieldset className="bg-card p-4 shadow sm:rounded-lg sm:p-8">
                                <DeleteUserForm className="max-w-xl" />
                            </Fieldset>
                        </TabsPanel>
                    </Tabs>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
