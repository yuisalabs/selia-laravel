import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PublicLayout from "@/layouts/public-layout";
import { Head, Link } from "@inertiajs/react";
import { 
    LucideArrowRight, 
    LucideBox, 
    LucideCode2, 
    LucideDatabase, 
    LucideLayers, 
    LucideLayoutTemplate, 
    LucideZap 
} from "lucide-react";

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            <Head title="Home" />
            
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-24 space-y-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <Badge variant="primary-outline" className="mb-6 py-1.5 px-4 text-sm font-medium rounded-full bg-background/50 backdrop-blur-sm border-primary/20 text-primary">
                        v1.0.0 Now Available
                    </Badge>
                    
                    <Heading size="lg" className="font-bold tracking-tight text-foreground text-4xl sm:text-6xl mb-6">
                        Build Modern Web Apps <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-600">
                            Faster Than Ever
                        </span>
                    </Heading>
                    
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10 leading-relaxed">
                        The ultimate starter kit for Laravel 12 and React 19. 
                        Pre-configured with Inertia.js 2.0, Tailwind CSS 4.0, and a beautiful UI library to help you ship your next idea in record time.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button 
                            size="lg" 
                            className="w-full sm:w-auto gap-2 text-base h-12 px-8" 
                            nativeButton={false}
                            render={
                                <Link href={route('register')}>
                                    Get Started
                                    <LucideArrowRight className="size-4" />
                                </Link>
                            }
                        />
                        <Button 
                            variant="outline" 
                            size="lg" 
                            className="w-full sm:w-auto gap-2 text-base h-12 px-8" 
                            nativeButton={false}
                            render={
                                <a href="https://selia.earth/docs" target="_blank" rel="noopener noreferrer">
                                    Documentation
                                </a>
                            }
                        />
                    </div>
                </div>

                {/* Preview Image */}
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
                    <div className="relative rounded-xl bg-background/50 p-2 shadow-2xl backdrop-blur-sm lg:rounded-2xl lg:p-4">
                        <img 
                            src="/assets/selia-preview.png" 
                            alt="Selia Dashboard Preview" 
                            className="rounded-lg shadow-sm w-full h-auto object-cover"
                        />
                        
                        {/* Decorative gradients */}
                        <div className="absolute -inset-1 -z-10 rounded-2xl bg-linear-to-br from-primary/30 to-purple-600/30 blur-2xl opacity-50" />
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 md:py-24 bg-card/50 border-y border-border/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <Heading size="lg" className="mb-4 text-3xl">Everything You Need</Heading>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Stop wasting time on configuration. Selia comes battery-packed with the latest technologies and best practices pre-configured.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={LucideZap}
                            title="Inertia.js 2.0"
                            description="Build single-page apps using classic server-side routing. No client-side routing complexity."
                        />
                        <FeatureCard 
                            icon={LucideLayoutTemplate}
                            title="React 19"
                            description="Leverage the latest React features including Server Components and Actions support."
                        />
                        <FeatureCard 
                            icon={LucideDatabase}
                            title="Laravel 12"
                            description="The PHP framework for web artisans. Powerful, elegant, and ready for any scale."
                        />
                        <FeatureCard 
                            icon={LucideBox}
                            title="Tailwind CSS 4.0"
                            description="Rapidly build modern websites without ever leaving your HTML. Now faster than ever."
                        />
                         <FeatureCard 
                            icon={LucideLayers}
                            title="UI Components"
                            description="A comprehensive set of accessible, unstyled components built on Radix UI and Shadcn."
                        />
                        <FeatureCard 
                            icon={LucideCode2}
                            title="Type Safe"
                            description="Full TypeScript support across the full stack with Spatie Laravel Data integration."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-border mt-auto">
                <p className="text-sm text-center text-muted-foreground">
                    © {new Date().getFullYear()} Selia UI Kit. All rights reserved.
                </p>
            </footer>
        </div>
    )
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
    return (
        <Card className="bg-background border-border/50 hover:border-primary/50 transition-colors h-full">
            <CardHeader className="border-b-0 pb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="size-6" />
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardBody className="pt-0">
                <CardDescription className="text-base leading-relaxed">
                    {description}
                </CardDescription>
            </CardBody>
        </Card>
    );
}

HomePage.layout = (page: any) => {
    return <PublicLayout children={page} />;
}