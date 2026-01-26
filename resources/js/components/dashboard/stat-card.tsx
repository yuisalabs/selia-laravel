import { Card } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    className?: string;
    trend?: number;
    trendLabel?: string;
}

export function StatCard({ title, value, icon: Icon, className, trend, trendLabel }: StatCardProps) {
    return (
        <Card className={cn("p-6 overflow-hidden bg-card shadow-sm sm:rounded-lg", className)}>
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
            </div>
            
            <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
                <div className="text-2xl font-bold text-foreground">{value}</div>
            </div>

            {(trend !== undefined && trendLabel) && (
                <div className="flex items-center mt-4 text-xs">
                    <span className={cn(
                        "font-medium px-2 py-0.5 rounded mr-2",
                        trend > 0 ? "text-success bg-success/10" : "text-destructive bg-destructive/10"
                    )}>
                        {trend > 0 ? '+' : ''}{trend}%
                    </span>
                    <span className="text-muted-foreground">{trendLabel}</span>
                </div>
            )}
        </Card>
    );
}
