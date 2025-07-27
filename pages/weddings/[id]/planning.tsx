		// pages/weddings/[id]/planning.tsx
		import { useEffect, useState, useMemo } from "react";
		import { useRouter } from "next/router";
		import Link from "next/link";
		import { Calendar, dateFnsLocalizer } from "react-big-calendar";
		import { format, parse, startOfWeek, getDay } from "date-fns";
		import {fr} from "date-fns/locale/fr";
		import "react-big-calendar/lib/css/react-big-calendar.css";

		const locales = { fr };
		const localizer = dateFnsLocalizer({
		  format,
		  parse,
		  startOfWeek,
		  getDay,
		  locales,
		});

		export default function PlanningPage() {
		  const router = useRouter();
		  const { id } = router.query;
		  const [user, setUser] = useState(null);
		  const [tasks, setTasks] = useState([]);


		  useEffect(() => {
			if (id) fetchTasks();
		  }, [id]);

		  const fetchTasks = async () => {
			const res = await fetch(`/api/weddings/${id}/tasks`);
			const data = await res.json();
			setTasks(data);
		  };

		  const events = useMemo(() => tasks.map((task) => ({
			title: task.title,
			start: new Date(task.due_date),
			end: new Date(task.due_date),
			allDay: true,
			resource: task,
		  })), [tasks]);

		  return (
			<div className="min-h-screen bg-gray-50 flex flex-col">
			  <header className="bg-white shadow px-6 py-4 flex justify-between items-center border-b border-gray-200">
				<Link href="/weddings"><span className="text-xl font-bold">Velana</span></Link>
			  </header>

			  <div className="flex flex-1">
				<aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
				  <nav className="text-sm space-y-3">
					<Link href={`/weddings/${id}/tasks`} className="block">Tâches</Link>
					<Link href={`/weddings/${id}/guests`} className="block">Invités</Link>
					<Link href={`/weddings/${id}/budget`} className="block">Budget</Link>
					<Link href={`/weddings/${id}/notes`} className="block">Notes</Link>
					<Link href={`/weddings/${id}/logistics`} className="block">Logistique</Link>
				  </nav>
				</aside>

				<main className="flex-1 p-6">
				  <h1 className="text-2xl font-semibold mb-4">Planning des Tâches</h1>

				  <div className="bg-white shadow rounded p-4">
					<Calendar
					  localizer={localizer}
					  events={events}
					  startAccessor="start"
					  endAccessor="end"
					  style={{ height: 300 }}
					  views={['month']}
					  culture="fr"
					  messages={{
						next: "Suivant",
						previous: "Précédent",
						today: "Aujourd'hui",
						month: "Mois",
					  }}
					  eventPropGetter={() => ({ className: "bg-blue-500 text-white" })}
					/>
				  </div>
				</main>
			  </div>

			  <footer className="bg-white border-t border-gray-200 text-center py-4 text-sm">
				Besoin d'aide ? <Link href="/support" className="underline">Support Velana</Link>
			  </footer>
			</div>
		  );
		}
