import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { getAutomationDistributionData } from '@/data/mockData';

const COLORS = [
  'hsl(238, 84%, 67%)',
  'hsl(142, 71%, 45%)',
  'hsl(38, 92%, 50%)',
  'hsl(217, 91%, 60%)',
  'hsl(280, 65%, 60%)',
];

interface DistributionChartProps {
  className?: string;
}

/**
 * Pie chart showing automation opportunity distribution by category
 */
export function DistributionChart({ className }: DistributionChartProps) {
  const data = getAutomationDistributionData();

  return (
    <div className={className}>
      <div className="card-elevated p-6 h-full">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Automation Distribution
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Opportunities by category type
        </p>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="hsl(var(--card))"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value} opportunities`, 'Count']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-lg)',
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span style={{ color: 'hsl(var(--foreground))', fontSize: '12px' }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
