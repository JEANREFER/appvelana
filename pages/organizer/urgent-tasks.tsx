import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "lucide-react";

type Task = {
  id: number;
  type: string;
  description: string;
  due_date: string;
  status: string;
  wedding?: {
    id?: number;
    couple_name?: string;
  };
};

export default function UrgentTasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/");
      return;
    }
    const localUser = JSON.parse(storedUser);
    setUser(localUser);

    const fetchTasks = async () => {
      try {
        const res = await fetch(`/api/organizer/tasks?organizerId=${localUser.id}`);
        if (res.status === 401) {
          setError("Session expirée. Veuillez vous reconnecter.");
          setTimeout(() => router.push("/"), 3000);
          return;
        }
        if (!res.ok) throw new Error("Erreur API");

        const data = await res.json();
        if (Array.isArray(data)) {
          setTasks(data as Task[]);
        } else {
          setTasks([]);
          setError("Format de données inattendu.");
        }
      } catch (err) {
        setError("Impossible de récupérer les tâches.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [router]);

  if (loading) return <p className="p-6">Chargement des tâches...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!user) return null;

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const inSevenDays = new Date(now);
  inSevenDays.setDate(now.getDate() + 7);

  const filteredTasks = tasks.filter(t =>
    t.status === "À faire" && t.due_date && (
      new Date(t.due_date) < now ||
      new Date(t.due_date) <= inSevenDays
    )
  );

  const tasksByWedding = filteredTasks.reduce((acc: Record<string, Task[]>, task) => {
    const key = task.wedding?.couple_name || `Mariage ID ${task.wedding?.id || "Inconnu"}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(task);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📋 Tâches urgentes à faire</h1>
        <Link href="/organizer/dashboard" className="text-blue-600 flex items-center">
          <ArrowLeftIcon className="w-5 h-5 mr-2" /> Retour Dashboard
        </Link>
      </div>

      {Object.keys(tasksByWedding).length === 0 ? (
        <p>Aucune tâche urgente à afficher 🎉</p>
      ) : (
        Object.entries(tasksByWedding).map(([coupleName, taskList]) => (
          <div key={coupleName} className="mb-8">
            <h2 className="text-xl font-semibold mb-3">{coupleName}</h2>
            <table className="min-w-full border">
              <thead>
                <tr>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Type</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Urgence</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {taskList
                  .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())
                  .map(task => {
                    const isLate = new Date(task.due_date) < now;
                    return (
                      <tr key={task.id} className={`${isLate ? "bg-red-100" : "bg-orange-100"} hover:bg-yellow-50`}>
                        <td className="p-2 border">{new Date(task.due_date).toLocaleDateString()}</td>
                        <td className="p-2 border">{task.type}</td>
                        <td className="p-2 border">{task.description || "Aucune description"}</td>
                        <td className="p-2 border font-semibold">{isLate ? "En retard" : "Urgent"}</td>
                        <td className="p-2 border">
                          <button className="text-blue-600 underline">Modifier</button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}
