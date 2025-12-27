/**
 * Core data types for the AI Operations Audit Dashboard
 */

export interface Department {
  id: string;
  name: string;
  painPoints: number;
  hoursWastedPerWeek: number;
  costImpactPerYear: number;
  automationOpportunities: number;
  workflows: Workflow[];
}

export interface Workflow {
  id: string;
  name: string;
  departmentId: string;
  steps: WorkflowStep[];
  currentTimeMinutes: number;
  potentialTimeMinutes: number;
  bottlenecks: string[];
}

export interface WorkflowStep {
  id: string;
  name: string;
  duration: number;
  type: 'manual' | 'automated' | 'semi-automated';
  isBottleneck: boolean;
  automationPotential: 'high' | 'medium' | 'low' | 'none';
}

export interface AutomationOpportunity {
  id: string;
  title: string;
  description: string;
  departmentId: string;
  departmentName: string;
  impactScore: number; // 1-10
  effortScore: number; // 1-10
  estimatedAnnualSavings: number;
  category: 'process' | 'communication' | 'data' | 'reporting' | 'integration';
  status: 'identified' | 'evaluated' | 'planned' | 'in-progress' | 'completed';
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  phase: 'quick-win' | 'medium-term' | 'long-term';
  startDay: number;
  endDay: number;
  dependencies: string[];
  status: 'pending' | 'in-progress' | 'completed';
  estimatedSavings: number;
  department: string;
}

export interface KPIData {
  totalPotentialSavings: {
    min: number;
    max: number;
  };
  departmentsAudited: number;
  painPointsIdentified: number;
  automationOpportunities: number;
}

export interface ROICalculatorInputs {
  employeeHourlyCost: number;
  hoursWastedPerWeek: number;
  automationImplementationCost: number;
}

export interface ROICalculatorOutputs {
  monthlySavings: number;
  annualSavings: number;
  paybackPeriodMonths: number;
}
