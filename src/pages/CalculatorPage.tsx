import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign, Clock, Wrench, TrendingUp, Calendar, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ROICalculatorInputs, ROICalculatorOutputs } from '@/types/dashboard';

/**
 * ROI Calculator Page
 * Interactive calculator for estimating automation savings
 */
export default function CalculatorPage() {
  const defaultInputs: ROICalculatorInputs = {
    employeeHourlyCost: 50,
    hoursWastedPerWeek: 40,
    automationImplementationCost: 25000,
  };

  const [inputs, setInputs] = useState<ROICalculatorInputs>(defaultInputs);

  // Calculate ROI outputs based on inputs
  const outputs: ROICalculatorOutputs = useMemo(() => {
    const weeklyWastedCost = inputs.employeeHourlyCost * inputs.hoursWastedPerWeek;
    const monthlySavings = weeklyWastedCost * 4.33; // Average weeks per month
    const annualSavings = weeklyWastedCost * 52;
    const paybackPeriodMonths = inputs.automationImplementationCost > 0
      ? inputs.automationImplementationCost / monthlySavings
      : 0;

    return {
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      paybackPeriodMonths: Math.round(paybackPeriodMonths * 10) / 10,
    };
  }, [inputs]);

  const handleReset = () => {
    setInputs(defaultInputs);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <PageHeader
          title="ROI Calculator"
          description="Estimate potential savings from automation implementation"
        >
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </PageHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            <div className="card-elevated p-6 opacity-0 animate-slide-up">
              <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Cost Inputs
              </h3>

              {/* Employee Hourly Cost */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <Label htmlFor="hourlyCost" className="text-sm font-medium text-foreground">
                    Employee Hourly Cost
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      ${inputs.employeeHourlyCost}
                    </span>
                    <span className="text-sm text-muted-foreground">/hour</span>
                  </div>
                </div>
                <Slider
                  id="hourlyCost"
                  min={20}
                  max={200}
                  step={5}
                  value={[inputs.employeeHourlyCost]}
                  onValueChange={(value) =>
                    setInputs({ ...inputs, employeeHourlyCost: value[0] })
                  }
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$20</span>
                  <span>$200</span>
                </div>
              </div>

              {/* Hours Wasted Per Week */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <Label htmlFor="hoursWasted" className="text-sm font-medium text-foreground">
                    Hours Wasted Per Week
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      {inputs.hoursWastedPerWeek}
                    </span>
                    <span className="text-sm text-muted-foreground">hours</span>
                  </div>
                </div>
                <Slider
                  id="hoursWasted"
                  min={5}
                  max={200}
                  step={5}
                  value={[inputs.hoursWastedPerWeek]}
                  onValueChange={(value) =>
                    setInputs({ ...inputs, hoursWastedPerWeek: value[0] })
                  }
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 hours</span>
                  <span>200 hours</span>
                </div>
              </div>

              {/* Implementation Cost */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label htmlFor="implementationCost" className="text-sm font-medium text-foreground">
                    Implementation Cost
                  </Label>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="implementationCost"
                    type="number"
                    min={0}
                    max={500000}
                    step={1000}
                    value={inputs.automationImplementationCost}
                    onChange={(e) =>
                      setInputs({
                        ...inputs,
                        automationImplementationCost: Number(e.target.value) || 0,
                      })
                    }
                    className="pl-7 text-lg font-medium"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Estimated total cost for automation tools, setup, and training
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card-elevated p-6 opacity-0 animate-slide-up delay-100">
              <h4 className="text-sm font-medium text-muted-foreground mb-4">
                Weekly Cost of Inefficiency
              </h4>
              <p className="text-3xl font-bold text-destructive">
                {formatCurrency(inputs.employeeHourlyCost * inputs.hoursWastedPerWeek)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Based on {inputs.hoursWastedPerWeek} hours × ${inputs.employeeHourlyCost}/hour
              </p>
            </div>
          </div>

          {/* Output Panel */}
          <div className="space-y-4">
            {/* Monthly Savings */}
            <div className="card-elevated p-6 border-l-4 border-l-primary opacity-0 animate-slide-up delay-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Monthly Savings
                  </p>
                  <p className="text-4xl font-bold text-foreground">
                    {formatCurrency(outputs.monthlySavings)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Projected monthly cost recovery
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>

            {/* Annual Savings */}
            <div className="bg-gradient-primary rounded-xl p-6 text-white opacity-0 animate-slide-up delay-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80 mb-1">
                    Annual Savings
                  </p>
                  <p className="text-4xl font-bold">
                    {formatCurrency(outputs.annualSavings)}
                  </p>
                  <p className="text-sm text-white/80 mt-2">
                    Total yearly cost recovery potential
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/20">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Payback Period */}
            <div className="card-elevated p-6 border-l-4 border-l-success opacity-0 animate-slide-up delay-400">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Payback Period
                  </p>
                  <p className="text-4xl font-bold text-foreground">
                    {outputs.paybackPeriodMonths.toFixed(1)}
                    <span className="text-xl font-normal text-muted-foreground ml-2">
                      months
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Time to recover implementation investment
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-success/10">
                  <Calendar className="w-6 h-6 text-success" />
                </div>
              </div>
            </div>

            {/* ROI Summary */}
            <div className="card-elevated p-6 opacity-0 animate-slide-up delay-500">
              <h4 className="text-sm font-medium text-foreground mb-4">
                3-Year ROI Summary
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Savings (3 years)</span>
                  <span className="font-semibold text-success">
                    {formatCurrency(outputs.annualSavings * 3)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Implementation Cost</span>
                  <span className="font-semibold text-destructive">
                    -{formatCurrency(inputs.automationImplementationCost)}
                  </span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">Net Benefit</span>
                  <span className="text-lg font-bold text-primary">
                    {formatCurrency(outputs.annualSavings * 3 - inputs.automationImplementationCost)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">ROI</span>
                  <span className="font-semibold text-success">
                    {inputs.automationImplementationCost > 0
                      ? `${Math.round(((outputs.annualSavings * 3 - inputs.automationImplementationCost) / inputs.automationImplementationCost) * 100)}%`
                      : '∞'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
