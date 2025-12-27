import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { roadmapItems } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, Circle, DollarSign, Building2 } from 'lucide-react';

const phaseConfig = {
  'quick-win': {
    label: 'Quick Wins',
    subtitle: '0–30 days',
    color: 'bg-success',
    borderColor: 'border-success',
    bgColor: 'bg-success/10',
  },
  'medium-term': {
    label: 'Medium Term',
    subtitle: '30–90 days',
    color: 'bg-warning',
    borderColor: 'border-warning',
    bgColor: 'bg-warning/10',
  },
  'long-term': {
    label: 'Long Term',
    subtitle: '90+ days',
    color: 'bg-primary',
    borderColor: 'border-primary',
    bgColor: 'bg-primary/10',
  },
};

/**
 * Implementation Roadmap Page
 * Timeline view of automation implementation phases
 */
export default function RoadmapPage() {
  const groupedItems = {
    'quick-win': roadmapItems.filter((i) => i.phase === 'quick-win'),
    'medium-term': roadmapItems.filter((i) => i.phase === 'medium-term'),
    'long-term': roadmapItems.filter((i) => i.phase === 'long-term'),
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-primary" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const totalSavings = roadmapItems.reduce((sum, item) => sum + item.estimatedSavings, 0);
  const phaseSavings = {
    'quick-win': groupedItems['quick-win'].reduce((sum, i) => sum + i.estimatedSavings, 0),
    'medium-term': groupedItems['medium-term'].reduce((sum, i) => sum + i.estimatedSavings, 0),
    'long-term': groupedItems['long-term'].reduce((sum, i) => sum + i.estimatedSavings, 0),
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <PageHeader
          title="Implementation Roadmap"
          description="Phased action plan for automation implementation"
        />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="card-elevated p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Projects</p>
            <p className="text-2xl font-bold text-foreground">{roadmapItems.length}</p>
          </div>
          <div className="card-elevated p-4 border-l-4 border-l-success">
            <p className="text-sm text-muted-foreground mb-1">Quick Wins</p>
            <p className="text-2xl font-bold text-success">
              ${(phaseSavings['quick-win'] / 1000).toFixed(0)}K
            </p>
          </div>
          <div className="card-elevated p-4 border-l-4 border-l-warning">
            <p className="text-sm text-muted-foreground mb-1">Medium Term</p>
            <p className="text-2xl font-bold text-warning">
              ${(phaseSavings['medium-term'] / 1000).toFixed(0)}K
            </p>
          </div>
          <div className="card-elevated p-4 border-l-4 border-l-primary">
            <p className="text-sm text-muted-foreground mb-1">Long Term</p>
            <p className="text-2xl font-bold text-primary">
              ${(phaseSavings['long-term'] / 1000).toFixed(0)}K
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {(Object.keys(phaseConfig) as Array<keyof typeof phaseConfig>).map((phase, phaseIndex) => {
            const config = phaseConfig[phase];
            const items = groupedItems[phase];

            return (
              <div
                key={phase}
                className="opacity-0 animate-slide-up"
                style={{ animationDelay: `${phaseIndex * 150}ms` }}
              >
                {/* Phase Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={cn('w-1 h-12 rounded-full', config.color)} />
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{config.label}</h3>
                    <p className="text-sm text-muted-foreground">{config.subtitle}</p>
                  </div>
                  <div className="flex-1 h-px bg-border" />
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">
                      ${(phaseSavings[phase] / 1000).toFixed(0)}K
                    </p>
                    <p className="text-xs text-muted-foreground">potential savings</p>
                  </div>
                </div>

                {/* Timeline Items */}
                <div className="ml-6 border-l-2 border-border pl-8 space-y-4">
                  {items.map((item, itemIndex) => (
                    <div
                      key={item.id}
                      className={cn(
                        'card-elevated p-5 relative',
                        item.status === 'in-progress' && config.borderColor,
                        item.status === 'in-progress' && 'border-l-4'
                      )}
                    >
                      {/* Timeline Dot */}
                      <div
                        className={cn(
                          'absolute -left-[42px] top-6 w-4 h-4 rounded-full border-2 border-background',
                          item.status === 'completed'
                            ? 'bg-success'
                            : item.status === 'in-progress'
                            ? 'bg-primary'
                            : 'bg-muted'
                        )}
                      />

                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            {getStatusIcon(item.status)}
                            <div>
                              <h4 className="font-semibold text-foreground">
                                {item.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {item.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-3 mt-3">
                                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <Building2 className="w-3.5 h-3.5" />
                                  {item.department}
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <Clock className="w-3.5 h-3.5" />
                                  Day {item.startDay} – {item.endDay}
                                </span>
                                {item.dependencies.length > 0 && (
                                  <span className="text-xs text-muted-foreground">
                                    Depends on: {item.dependencies.length} task(s)
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Savings & Status */}
                        <div className="flex items-center gap-4 sm:gap-6">
                          <div className="text-right">
                            <div className="inline-flex items-center gap-1 text-success">
                              <DollarSign className="w-4 h-4" />
                              <span className="text-lg font-bold">
                                {(item.estimatedSavings / 1000).toFixed(0)}K
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">annual savings</p>
                          </div>
                          <div
                            className={cn(
                              'px-3 py-1.5 rounded-full text-xs font-medium',
                              item.status === 'completed'
                                ? 'bg-success/10 text-success'
                                : item.status === 'in-progress'
                                ? 'bg-primary/10 text-primary'
                                : 'bg-muted text-muted-foreground'
                            )}
                          >
                            {item.status === 'completed'
                              ? 'Completed'
                              : item.status === 'in-progress'
                              ? 'In Progress'
                              : 'Pending'}
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar (for in-progress items) */}
                      {item.status === 'in-progress' && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-muted-foreground">Progress</span>
                            <span className="text-xs font-medium text-primary">45%</span>
                          </div>
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                              style={{ width: '45%' }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Summary */}
        <div className="mt-12 card-elevated p-6 bg-gradient-primary text-white opacity-0 animate-slide-up delay-500">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">Total Implementation Value</h3>
              <p className="text-white/80 text-sm mt-1">
                Combined annual savings from all roadmap initiatives
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold">
                ${(totalSavings / 1000).toFixed(0)}K
              </p>
              <p className="text-white/80 text-sm">per year</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
