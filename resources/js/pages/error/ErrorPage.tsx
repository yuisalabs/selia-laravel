import { Button, buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { cn } from '@/utils/cn';
import { Head, Link } from '@inertiajs/react';
import { LucideArrowLeft, LucideHome, LucideRefreshCw } from 'lucide-react';

interface ErrorPageProps {
    status: number;
}

const errorMessages: Record<number, { title: string; description: string }> = {
    403: {
        title: 'Forbidden',
        description: "You don't have permission to access this resource.",
    },
    404: {
        title: 'Page Not Found',
        description: 'The page you are looking for could not be found.',
    },
    419: {
        title: 'Page Expired',
        description: 'Your session has expired. Please refresh and try again.',
    },
    429: {
        title: 'Too Many Requests',
        description: "You've made too many requests. Please wait a moment.",
    },
    500: {
        title: 'Server Error',
        description: 'Something went wrong on our end. Please try again later.',
    },
    503: {
        title: 'Service Unavailable',
        description: "We're currently under maintenance. Please check back soon.",
    },
};

export default function ErrorPage({ status }: ErrorPageProps) {
    const error = errorMessages[status] || {
        title: 'Error',
        description: 'An unexpected error occurred.',
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
            <Head title={`${status} - ${error.title}`} />
            
            <div className="text-center max-w-md">
                <div className="relative mb-6">
                    <span className="text-[10rem] font-black leading-none text-primary/10 select-none">
                        {status}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-bold text-primary">
                            {status}
                        </span>
                    </div>
                </div>

                <Heading size="lg" className="text-foreground mb-3">
                    {error.title}
                </Heading>

                <p className="text-muted mb-8 text-lg">
                    {error.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="outline" onClick={handleGoBack}>
                        <LucideArrowLeft className="size-4" />
                        Go Back
                    </Button>
                    
                    <Link
                        href="/"
                        className={cn(buttonVariants({ variant: 'primary' }))}
                    >
                        <LucideHome className="size-4" />
                        Go Home
                    </Link>

                    {status === 419 && (
                        <Button 
                            variant="secondary" 
                            onClick={() => window.location.reload()}
                        >
                            <LucideRefreshCw className="size-4" />
                            Refresh Page
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
