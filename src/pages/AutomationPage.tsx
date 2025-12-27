import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { automationOpportunities } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useState, useMemo } from 'react';
import { ArrowUpDown, Filter, Zap, Target, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SortField = 'impact' | 'effort' | 'savings';
type SortDirection = 'asc' | 'desc';

const categoryLabels: Record<string, string> = {
  process: 'Process',
  communication: 'Communication',
  data: 'Data & Analytics',
  reporting: 'Reporting',
  integration: 'Integration',
};

const statusLabels: Record<string, { label: string; color: string }> = {
  identified: { label: 'Identified', color: 'bg-muted text-muted-foreground' },
  evaluated: { label: 'Evaluated', color: 'bg-info/10 text-info' },
  planned: { label: 'Planned', color: 'bg-warning/10 text-warning' },
  'in-progress': { label: 'In Progress', color: 'bg-primary/10 text-primary' },
  completed: { label: 'Completed', color: 'bg-success/10 text-success' },
};

/**
 * Automation Opportunities Page
 * Filterable and sortable list of automation opportunities
 */
export default function AutomationPage() {
  const [sortField, setSortField] = useState<SortField>('impact');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  const departments = useMemo(() => {
    const depts = new Set(automationOpportunities.map((o) => o.departmentName));
    return Array.from(depts).sort();
  }, []);

  const filteredAndSorted = useMemo(() => {
    let result = [...automationOpportunities];

    // Apply filters
    if (categoryFilter !== 'all') {
      result = result.filter((o) => o.category === categoryFilter);
    }
    if (departmentFilter !== 'all') {
      result = result.filter((o) => o.departmentName === departmentFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      let aVal: number, bVal: number;
      switch (sortField) {
        case 'impact':
          aVal = a.impactScore;
          bVal = b.impactScore;
          break;
        case 'effort':
          aVal = a.effortScore;
          bVal = b.effortScore;
          break;
        case 'savings':
          aVal = a.estimatedAnnualSavings;
          bVal = b.estimatedAnnualSavings;
          break;
        default:
          return 0;
      }
      return sortDirection === 'desc' ? bVal - aVal : aVal - bVal;
    });

    return result;
  }, [sortField, sortDirection, categoryFilter, departmentFilter]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getScoreColor = (score: number, type: 'impact' | 'effort') => {
    if (type === 'impact') {
      if (score >= 8) return 'text-success';
      if (score >= 6) return 'text-warning';
      return 'text-muted-foreground';
    } else {
      if (score <= 3) return 'text-success';
      if (score <= 5) return 'text-warning';
      return 'text-destructive';
    }
  };

  const totalSavings = filteredAndSorted.reduce((sum, o) => sum + o.estimatedAnnualSavings, 0);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <PageHeader
          title="Automation Opportunities"
          description="Identified automation opportunities ranked by impact and effort"
        />

        {/* Filters */}
        <div className="card-elevated p-4 mb-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filters:</span>
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Button
              variant={sortField === 'impact' ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleSort('impact')}
              className="gap-1"
            >
              Impact
              <ArrowUpDown className="w-3 h-3" />
            </Button>
            <Button
              variant={sortField === 'effort' ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleSort('effort')}
              className="gap-1"
            >
              Effort
              <ArrowUpDown className="w-3 h-3" />
            </Button>
            <Button
              variant={sortField === 'savings' ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleSort('savings')}
              className="gap-1"
            >
              Savings
              <ArrowUpDown className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="card-elevated p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {filteredAndSorted.length}
            </p>
            <p className="text-sm text-muted-foreground">Opportunities</p>
          </div>
          <div className="card-elevated p-4 text-center">
            <p className="text-2xl font-bold text-success">
              ${(totalSavings / 1000).toFixed(0)}K
            </p>
            <p className="text-sm text-muted-foreground">Potential Savings</p>
          </div>
          <div className="card-elevated p-4 text-center">
            <p className="text-2xl font-bold text-primary">
              {filteredAndSorted.filter((o) => o.impactScore >= 8).length}
            </p>
            <p className="text-sm text-muted-foreground">High Impact</p>
          </div>
        </div>

        {/* Opportunities List */}
        <div className="space-y-4">
          {filteredAndSorted.map((opportunity, index) => (
            <div
              key={opportunity.id}
              className="card-elevated p-6 hover:scale-[1.01] transition-all opacity-0 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Main Content */}
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">
                        {opportunity.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {opportunity.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                          {opportunity.departmentName}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                          {categoryLabels[opportunity.category]}
                        </span>
                        <span
                          className={cn(
                            'px-2.5 py-1 rounded-full text-xs font-medium',
                            statusLabels[opportunity.status]?.color
                          )}
                        >
                          {statusLabels[opportunity.status]?.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scores */}
                <div className="flex items-center gap-6 lg:gap-8">
                  <div className="text-center">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Target className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Impact</span>
                    </div>
                    <p className={cn('text-2xl font-bold', getScoreColor(opportunity.impactScore, 'impact'))}>
                      {opportunity.impactScore}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Wrench className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Effort</span>
                    </div>
                    <p className={cn('text-2xl font-bold', getScoreColor(opportunity.effortScore, 'effort'))}>
                      {opportunity.effortScore}
                    </p>
                  </div>
                  <div className="text-center min-w-[80px]">
                    <div className="text-xs text-muted-foreground mb-1">Annual Savings</div>
                    <p className="text-xl font-bold text-success">
                      ${(opportunity.estimatedAnnualSavings / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
