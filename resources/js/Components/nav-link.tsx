import { cn } from '@/utils/cn';
import { InertiaLinkProps, Link } from '@inertiajs/react';
import { Button } from './ui/button';

export default function NavLink({
    active = false,
    className = '',
    children,
    as: Component = Link,
    ...props
}: any) {
    return (
        <Button
            nativeButton={false}
            variant="plain"
            className={cn(
                "relative rounded-md hover:bg-transparent active:bg-transparent transition-colors ease-in-out px-3 py-2",
                active
                    ? 'text-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground font-medium',
                className
            )}
            render={
                <Component {...props}>
                    {children}
                    {active && (
                        <span className="absolute bottom-0 left-1/2 w-3/4 transform -translate-x-1/2 translate-y-3.5 h-0.75 bg-primary rounded-full" />
                    )}
                </Component>
            }
        />
    );
}
