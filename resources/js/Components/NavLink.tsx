import { cn } from '@/utils/cn';
import { InertiaLinkProps, Link } from '@inertiajs/react';
import { Button } from './ui/button';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
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
                <Link {...props}>
                    {children}
                    {active && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full transform translate-y-3.5" />
                    )}
                </Link>
            }
        />
    );
}
