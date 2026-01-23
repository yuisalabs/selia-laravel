import ApplicationLogo from '@/components/ApplicationLogo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-background pt-6 sm:justify-center sm:pt-0">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            
            <div className="mt-6 w-full overflow-hidden bg-card px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                <Link href="/" className="flex justify-center mb-4">
                    <ApplicationLogo className="h-16 w-16 fill-current text-muted" />
                </Link>

                {children}
            </div>
        </div>
    );
}
