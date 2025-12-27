import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    positive: boolean;
  };
  variant?: 'default' | 'primary' | 'success';
  className?: string;
  delay?: number;
}

/**
 * KPI Card component for displaying key metrics
 * Used throughout the dashboard to highlight important numbers
 */
export function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  className,
  delay = 0,
}: KPICardProps) {
  const variants = {
    default: 'bg-card border-border',
    primary: 'bg-gradient-primary border-primary/20 text-primary-foreground',
    success: 'bg-gradient-success border-success/20 text-success-foreground',
  };

  const iconVariants = {
    default: 'bg-primary/10 text-primary',
    primary: 'bg-white/20 text-white',
    success: 'bg-white/20 text-white',
  };

  const textVariants = {
    default: 'text-muted-foreground',
    primary: 'text-white/80',
    success: 'text-white/80',
  };

  return (
    <div
      className={cn(
        'card-elevated p-6 transition-all duration-300 hover:scale-[1.02] opacity-0 animate-slide-up',
        variants[variant],
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={cn('text-sm font-medium mb-1', textVariants[variant])}>
            {title}
          </p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {subtitle && (
            <p className={cn('text-sm mt-1', textVariants[variant])}>
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="flex items-center gap-1.5 mt-3">
              <span
                className={cn(
                  'text-sm font-medium',
                  trend.positive ? 'text-success' : 'text-destructive'
                )}
              >
                {trend.positive ? '+' : '-'}{trend.value}%
              </span>
              <span className={cn('text-sm', textVariants[variant])}>
                {trend.label}
              </span>
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-xl', iconVariants[variant])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
