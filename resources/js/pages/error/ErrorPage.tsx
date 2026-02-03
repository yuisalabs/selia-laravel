import { Button, buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { cn } from '@/utils/cn';
import { Head, Link } from '@inertiajs/react';
import { LucideArrowLeft, LucideHome, LucideRefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ErrorPageProps {
    status: number;
}

export default function ErrorPage({ status }: ErrorPageProps) {
    const { t } = useTranslation();

    const getErrorInfo = (status: number) => {
        switch (status) {
            case 403:
                return { title: t('error.403'), description: t('error.403_message') };
            case 404:
                return { title: t('error.404'), description: t('error.404_message') };
            case 419:
                return { title: t('error.419'), description: t('error.419_message') };
            case 429:
                return { title: t('error.429'), description: t('error.429_message') };
            case 500:
                return { title: t('error.500'), description: t('error.500_message') };
            case 503:
                return { title: t('error.503'), description: t('error.503_message') };
            default:
                return { title: t('error.title'), description: t('error.default_message') };
        }
    };

    const error = getErrorInfo(status);

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
                        {t('common.back')}
                    </Button>
                    
                    <Link
                        href="/"
                        className={cn(buttonVariants({ variant: 'primary' }))}
                    >
                        <LucideHome className="size-4" />
                        {t('error.go_home')}
                    </Link>

                    {status === 419 && (
                        <Button 
                            variant="secondary" 
                            onClick={() => window.location.reload()}
                        >
                            <LucideRefreshCw className="size-4" />
                            {t('common.refresh')}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
