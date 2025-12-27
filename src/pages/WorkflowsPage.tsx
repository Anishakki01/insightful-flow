import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { workflows } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Clock, AlertCircle, Zap, ChevronDown } from 'lucide-react';
import { useState } from 'react';

/**
 * Workflow Mapping Page
 * Visual representation of workflows with bottlenecks and automation potential
 */
export default function WorkflowsPage() {
  const [expandedWorkflow, setExpandedWorkflow] = useState<string | null>(workflows[0]?.id || null);

  const getAutomationColor = (potential: string) => {
    switch (potential) {
      case 'high':
        return 'bg-success text-success-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStepTypeStyles = (type: string, isBottleneck: boolean) => {
    if (isBottleneck) {
      return 'border-destructive bg-destructive/10';
    }
    switch (type) {
      case 'automated':
        return 'border-success bg-success/10';
      case 'semi-automated':
        return 'border-warning bg-warning/10';
      default:
        return 'border-border bg-card';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <PageHeader
          title="Workflow Mapping"
          description="Visual representation of current workflows, bottlenecks, and automation potential"
        />

        {/* Legend */}
        <div className="card-elevated p-4 mb-6 flex flex-wrap items-center gap-6">
          <span className="text-sm font-medium text-foreground">Legend:</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border-2 border-success bg-success/10" />
            <span className="text-sm text-muted-foreground">Automated</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border-2 border-warning bg-warning/10" />
            <span className="text-sm text-muted-foreground">Semi-automated</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border-2 border-border bg-card" />
            <span className="text-sm text-muted-foreground">Manual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border-2 border-destructive bg-destructive/10" />
            <span className="text-sm text-muted-foreground">Bottleneck</span>
          </div>
        </div>

        {/* Workflows */}
        <div className="space-y-4">
          {workflows.map((workflow, wIndex) => {
            const isExpanded = expandedWorkflow === workflow.id;
            const timeSaved = workflow.currentTimeMinutes - workflow.potentialTimeMinutes;
            const savingsPercent = Math.round((timeSaved / workflow.currentTimeMinutes) * 100);

            return (
              <div
                key={workflow.id}
                className="card-elevated overflow-hidden opacity-0 animate-slide-up"
                style={{ animationDelay: `${wIndex * 100}ms` }}
              >
                {/* Header */}
                <button
                  onClick={() => setExpandedWorkflow(isExpanded ? null : workflow.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-start">
                      <h3 className="text-lg font-semibold text-foreground">
                        {workflow.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {workflow.steps.length} steps · {workflow.bottlenecks.length} bottlenecks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          {workflow.currentTimeMinutes} min
                        </p>
                        <p className="text-xs text-muted-foreground">Current</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-success">
                          {workflow.potentialTimeMinutes} min
                        </p>
                        <p className="text-xs text-muted-foreground">Potential</p>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                        -{savingsPercent}%
                      </div>
                    </div>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 text-muted-foreground transition-transform',
                        isExpanded && 'rotate-180'
                      )}
                    />
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 animate-fade-in">
                    {/* Time Stats (Mobile) */}
                    <div className="sm:hidden flex items-center gap-4 mb-4 pb-4 border-b border-border">
                      <div className="flex-1 text-center p-3 rounded-lg bg-muted/50">
                        <p className="text-lg font-semibold text-foreground">
                          {workflow.currentTimeMinutes} min
                        </p>
                        <p className="text-xs text-muted-foreground">Current</p>
                      </div>
                      <div className="flex-1 text-center p-3 rounded-lg bg-success/10">
                        <p className="text-lg font-semibold text-success">
                          {workflow.potentialTimeMinutes} min
                        </p>
                        <p className="text-xs text-muted-foreground">Potential</p>
                      </div>
                    </div>

                    {/* Bottlenecks */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-foreground mb-2">
                        Identified Bottlenecks
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {workflow.bottlenecks.map((bottleneck, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm"
                          >
                            <AlertCircle className="w-3.5 h-3.5" />
                            {bottleneck}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Workflow Steps */}
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-4">
                        Process Flow
                      </h4>
                      <div className="flex flex-wrap items-start gap-2">
                        {workflow.steps.map((step, index) => (
                          <div key={step.id} className="flex items-center">
                            <div
                              className={cn(
                                'relative p-4 rounded-xl border-2 min-w-[140px] transition-all hover:scale-105',
                                getStepTypeStyles(step.type, step.isBottleneck)
                              )}
                            >
                              <p className="font-medium text-foreground text-sm mb-1">
                                {step.name}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>{step.duration} min</span>
                              </div>
                              {step.automationPotential !== 'none' && (
                                <div className="absolute -top-2 -right-2">
                                  <span
                                    className={cn(
                                      'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
                                      getAutomationColor(step.automationPotential)
                                    )}
                                  >
                                    <Zap className="w-3 h-3" />
                                    {step.automationPotential}
                                  </span>
                                </div>
                              )}
                              {step.isBottleneck && (
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                                  <span className="px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground text-xs font-medium">
                                    Bottleneck
                                  </span>
                                </div>
                              )}
                            </div>
                            {index < workflow.steps.length - 1 && (
                              <div className="w-8 h-0.5 bg-border mx-1" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
