import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { departments } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { AlertTriangle, Clock, DollarSign, Zap, ChevronRight } from 'lucide-react';
import { useState } from 'react';

/**
 * Department Analysis Page
 * Shows detailed breakdown of inefficiencies per department
 */
export default function DepartmentsPage() {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const selectedDepartment = departments.find((d) => d.id === selectedDept);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <PageHeader
          title="Department Analysis"
          description="Detailed breakdown of workflow inefficiencies and automation opportunities by department"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Department List */}
          <div className="lg:col-span-2">
            <div className="card-elevated overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left text-sm font-semibold text-foreground px-6 py-4">
                        Department
                      </th>
                      <th className="text-center text-sm font-semibold text-foreground px-4 py-4">
                        Pain Points
                      </th>
                      <th className="text-center text-sm font-semibold text-foreground px-4 py-4">
                        Hours Wasted
                      </th>
                      <th className="text-right text-sm font-semibold text-foreground px-6 py-4">
                        Cost Impact
                      </th>
                      <th className="w-10" />
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((dept, index) => (
                      <tr
                        key={dept.id}
                        onClick={() => setSelectedDept(dept.id === selectedDept ? null : dept.id)}
                        className={cn(
                          'border-b border-border last:border-0 cursor-pointer transition-colors opacity-0 animate-slide-up',
                          selectedDept === dept.id
                            ? 'bg-primary/5'
                            : 'hover:bg-muted/50'
                        )}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                'w-2 h-2 rounded-full',
                                dept.automationOpportunities >= 2
                                  ? 'bg-success'
                                  : dept.automationOpportunities === 1
                                  ? 'bg-warning'
                                  : 'bg-muted-foreground'
                              )}
                            />
                            <span className="font-medium text-foreground">
                              {dept.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="inline-flex items-center gap-1.5 text-sm">
                            <AlertTriangle className="w-3.5 h-3.5 text-warning" />
                            {dept.painPoints}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="text-sm text-muted-foreground">
                            {dept.hoursWastedPerWeek}h/week
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-semibold text-foreground">
                            ${dept.costImpactPerYear.toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground ml-1">/year</span>
                        </td>
                        <td className="pr-4">
                          <ChevronRight
                            className={cn(
                              'w-4 h-4 text-muted-foreground transition-transform',
                              selectedDept === dept.id && 'rotate-90'
                            )}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="card-elevated p-4 text-center">
                <p className="text-2xl font-bold text-foreground">
                  {departments.reduce((sum, d) => sum + d.painPoints, 0)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Total Pain Points</p>
              </div>
              <div className="card-elevated p-4 text-center">
                <p className="text-2xl font-bold text-foreground">
                  {departments.reduce((sum, d) => sum + d.hoursWastedPerWeek, 0)}h
                </p>
                <p className="text-xs text-muted-foreground mt-1">Weekly Hours Wasted</p>
              </div>
              <div className="card-elevated p-4 text-center">
                <p className="text-2xl font-bold text-success">
                  ${(departments.reduce((sum, d) => sum + d.costImpactPerYear, 0) / 1000).toFixed(0)}K
                </p>
                <p className="text-xs text-muted-foreground mt-1">Annual Cost Impact</p>
              </div>
              <div className="card-elevated p-4 text-center">
                <p className="text-2xl font-bold text-primary">
                  {departments.reduce((sum, d) => sum + d.automationOpportunities, 0)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Automation Opps</p>
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            <div className="card-elevated p-6 sticky top-6">
              {selectedDepartment ? (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {selectedDepartment.name}
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">
                          {selectedDepartment.painPoints} Pain Points
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Identified workflow inefficiencies
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <Clock className="w-5 h-5 text-info mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">
                          {selectedDepartment.hoursWastedPerWeek} hours/week
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Time lost to manual processes
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <DollarSign className="w-5 h-5 text-success mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">
                          ${selectedDepartment.costImpactPerYear.toLocaleString()}/year
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Potential cost recovery
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10">
                      <Zap className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">
                          {selectedDepartment.automationOpportunities} Opportunities
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Ready for automation
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Click on "Automation" in the sidebar to see detailed automation opportunities for this department.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                    <ChevronRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    Select a department to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
