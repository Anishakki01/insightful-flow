import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { KPICard } from '@/components/dashboard/KPICard';
import { SavingsChart } from '@/components/dashboard/SavingsChart';
import { DistributionChart } from '@/components/dashboard/DistributionChart';
import { kpiData, departments, automationOpportunities } from '@/data/mockData';
import { DollarSign, Building2, AlertTriangle, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

/**
 * Dashboard Overview Page
 * Primary landing page showing high-level KPIs and summary charts
 */
export default function DashboardPage() {
  const totalHoursWasted = departments.reduce((sum, d) => sum + d.hoursWastedPerWeek, 0);
  const highImpactCount = automationOpportunities.filter((o) => o.impactScore >= 8).length;

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <PageHeader
          title="Operations Audit Dashboard"
          description="Executive summary of workflow inefficiencies and automation opportunities"
        >
          <Button asChild>
            <Link to="/automation" className="gap-2">
              View Opportunities
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </PageHeader>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <KPICard
            title="Potential Annual Savings"
            value={`$${(kpiData.totalPotentialSavings.min / 1000).toFixed(0)}K - $${(kpiData.totalPotentialSavings.max / 1000).toFixed(0)}K`}
            icon={DollarSign}
            variant="primary"
            delay={0}
          />
          <KPICard
            title="Departments Audited"
            value={kpiData.departmentsAudited}
            subtitle="Across all operations"
            icon={Building2}
            delay={100}
          />
          <KPICard
            title="Pain Points Identified"
            value={kpiData.painPointsIdentified}
            icon={AlertTriangle}
            trend={{ value: 12, label: 'from initial assessment', positive: false }}
            delay={200}
          />
          <KPICard
            title="Automation Opportunities"
            value={kpiData.automationOpportunities}
            subtitle={`${highImpactCount} high-impact`}
            icon={Zap}
            delay={300}
          />
        </div>

        {/* Summary Stats Bar */}
        <div className="card-elevated p-4 mb-8 opacity-0 animate-slide-up delay-400">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{totalHoursWasted}h</span>
                  {' '}wasted weekly
                </span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-border" />
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Avg ROI payback:{' '}
                  <span className="font-semibold text-foreground">4.2 months</span>
                </span>
              </div>
            </div>
            <Link
              to="/calculator"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Calculate your ROI →
            </Link>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SavingsChart className="opacity-0 animate-slide-up delay-500" />
          <DistributionChart className="opacity-0 animate-slide-up delay-500" />
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 opacity-0 animate-slide-up delay-500">
          <Link
            to="/departments"
            className="card-elevated p-5 group hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  Department Analysis
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Detailed breakdown by team
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
          <Link
            to="/workflows"
            className="card-elevated p-5 group hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  Workflow Mapping
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Visualize process bottlenecks
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
          <Link
            to="/roadmap"
            className="card-elevated p-5 group hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  Implementation Roadmap
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Phased action plan
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
