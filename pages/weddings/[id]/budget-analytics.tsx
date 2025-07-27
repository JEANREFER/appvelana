// 📁 pages/weddings/[id]/budget-analytics.tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a6cee3", "#fdbf6f", "#b2df8a"];

export default function BudgetAnalyticsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [comparisonData, setComparisonData] = useState([]);
  const [distributionData, setDistributionData] = useState([]);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/weddings/${id}/budget/comparison`).then(res => res.json()).then(setComparisonData);
    fetch(`/api/weddings/${id}/budget/distribution`).then(res => res.json()).then(setDistributionData);
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analyse du budget</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Comparatif : Budget prévu vs réel</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="prevu" fill="#8884d8" name="Prévu" />
              <Bar dataKey="reel" fill="#82ca9d" name="Réel" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Répartition des dépenses réelles</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distributionData}
                dataKey="amount"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
