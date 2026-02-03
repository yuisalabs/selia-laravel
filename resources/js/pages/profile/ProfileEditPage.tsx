import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from '../../features/profile/delete-user-form';
import UpdatePasswordForm from '../../features/profile/update-password-form';
import UpdateProfileInformationForm from '../../features/profile/update-profile-information-form';
import { Tabs, TabsItem, TabsList, TabsPanel } from '@/components/ui/tabs';
import { Fieldset } from '@/components/ui/fieldset';
import { Heading } from '@/components/ui/heading';
import { useTranslation } from 'react-i18next';

export default function ProfileEditPage({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('profile.title')} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6 space-y-6 sm:px-6 lg:px-8">
                    <Tabs defaultValue="profile" className="lg:w-6/12 w-full mx-auto">
                        <TabsList>
                            <TabsItem value="profile" className="text-nowrap truncate">{t('profile.information')}</TabsItem>
                            <TabsItem value="password">{t('auth.password')}</TabsItem>
                            <TabsItem className="text-nowrap" value="delete-account">{t('profile.delete_account')}</TabsItem>
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

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout
            header={<Heading size="sm">{t('profile.title')}</Heading>}
            breadcrumbs={[{ label: t('profile.title') }]}
        >
            {children}
        </AuthenticatedLayout>
    );
};

ProfileEditPage.layout = (page: any) => <ProfileLayout>{page}</ProfileLayout>;
