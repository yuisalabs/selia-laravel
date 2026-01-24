import PublicLayout from "@/layouts/public-layout";
import { Head } from "@inertiajs/react";

export default function HomePage() {
    return (
        <div className="mx-auto max-w-7xl">
            <Head title="Home" />
            <div className="p-6 text-foreground">
                Welcome to Laravel Selia UI Kit!
            </div>
        </div>
    )
}

HomePage.layout = (page: any) => {
    return <PublicLayout children={page} />;
}