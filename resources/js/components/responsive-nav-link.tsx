import { cn } from '@/utils/cn';
import { InertiaLinkProps, Link } from '@inertiajs/react';
import { Button } from './ui/button';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    as: Component = Link,
    ...props
}: any) {
    return (
        <Button
            nativeButton={props.as === 'button'}
            variant="plain"
            block
            className={cn(
                "h-auto items-start justify-start rounded-none border-l-4 py-2 pe-4 ps-3 text-base font-medium transition duration-150 ease-in-out focus:outline-none",
                active
                    ? 'border-primary bg-primary/10 text-primary focus:border-primary focus:bg-primary/20 focus:text-primary'
                    : 'border-transparent text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground focus:border-border focus:bg-accent focus:text-foreground',
                className
            )}
            render={
                <Component {...props}>
                    {children}
                </Component>
            }
        />
    );
}
