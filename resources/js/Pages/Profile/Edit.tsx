import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './partials/DeleteUserForm';
import UpdatePasswordForm from './partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './partials/UpdateProfileInformationForm';
import { Tabs, TabsItem, TabsList, TabsPanel } from '@/components/ui/tabs';
import { Fieldset } from '@/components/ui/fieldset';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
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
                            <Fieldset className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl"
                                />
                            </Fieldset>
                        </TabsPanel>
                        <TabsPanel value="password">
                            <Fieldset className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                                <UpdatePasswordForm className="max-w-xl" />
                            </Fieldset>
                        </TabsPanel>
                        <TabsPanel value="delete-account">
                            <Fieldset className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                                <DeleteUserForm className="max-w-xl" />
                            </Fieldset>
                        </TabsPanel>
                    </Tabs>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
