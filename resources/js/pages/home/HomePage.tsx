import { Heading } from "@/components/ui/heading";
import PublicLayout from "@/layouts/public-layout";
import { Head } from "@inertiajs/react";

export default function HomePage() {
    return (
        <div className="mx-auto max-w-7xl">
            <Head title="Home" />
            <Heading size="lg" className="text-foreground p-6 text-center">Welcome to Laravel Selia UI Kit!</Heading>
        </div>
    )
}

HomePage.layout = (page: any) => {
    return <PublicLayout children={page} />;
}