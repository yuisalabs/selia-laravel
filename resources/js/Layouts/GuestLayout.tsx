import ApplicationLogo from '@/components/ApplicationLogo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 dark:bg-gray-900">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            
            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                <Link href="/" className="flex justify-center mb-4">
                    <ApplicationLogo className="h-16 w-16 fill-current text-gray-500 dark:text-gray-400" />
                </Link>

                {children}
            </div>
        </div>
    );
}
