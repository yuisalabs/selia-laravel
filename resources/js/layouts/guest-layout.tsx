import ApplicationLogo from '@/components/application-logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-background pt-6 sm:justify-center sm:pt-0">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            
            <Card className="mt-6 w-full overflow-hidden bg-card px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                <Link href="/" className="flex justify-center">
                    <ApplicationLogo className="h-10 w-10 fill-current text-muted" />
                </Link>

                {children}
            </Card>
        </div>
    );
}
