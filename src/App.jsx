import { useEffect, useState } from "react";
import "./styles/app.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Workspace from "./components/Workspace";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import Courses from "./pages/Courses";
import MyLearning from "./pages/MyLearning";
import GroupChat from "./pages/GroupChat";
import Certificates from "./pages/Certificates";
import FinalExams from "./pages/FinalExams";
import Landing from "./pages/Landing";
import Login from "./pages/Login";

export default function App() {
	const [theme, setTheme] = useState(() => localStorage.getItem("zecurx-theme") || "dark");
	const [view, setView] = useState("landing");
	const [user, setUser] = useState(null);
	const [page, setPage] = useState("dashboard");
	const [collapsed, setCollapsed] = useState(false);
	const [workspace, setWorkspace] = useState(false);

	useEffect(() => {
		document.body.style.overflow = view === "app" ? "hidden" : "auto";

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [view]);

	useEffect(() => {
		document.body.classList.toggle("theme-light", theme === "light");
		localStorage.setItem("zecurx-theme", theme);
	}, [theme]);

	function toggleTheme() {
		setTheme((current) => (current === "light" ? "dark" : "light"));
	}

	async function handleLogin(credentials) {
		const isValid =
			credentials.email === "alex@zecurxlearn.local" &&
			credentials.password === "secure123";

		if (!isValid) {
			return false;
		}

		setUser({ name: "Alex Kim", email: credentials.email });
		setView("app");
		setPage("dashboard");
		return true;
	}

	function handleLogout() {
		setUser(null);
		setWorkspace(false);
		setCollapsed(false);
		setView("landing");
	}

	function renderPage() {
		switch (page) {
			case "dashboard":
				return <Dashboard onNavigate={setPage} onStartWorkspace={() => setWorkspace(true)} />;
			case "explore":
				return <Explore />;
			case "courses":
				return <Courses onStartWorkspace={() => setWorkspace(true)} />;
			case "learning":
				return <MyLearning />;
			case "chat":
				return <GroupChat />;
			case "certs":
				return <Certificates />;
			case "exams":
				return <FinalExams />;
			default:
				return null;
		}
	}

	return (
		<>
			{view === "landing" && (
				<Landing
					onGetStarted={() => setView("login")}
					theme={theme}
					onToggleTheme={toggleTheme}
				/>
			)}
			{view === "login" && (
				<Login
					onBack={() => setView("landing")}
					onLogin={handleLogin}
					theme={theme}
					onToggleTheme={toggleTheme}
				/>
			)}

			{view === "app" && user && (
			<div className="app">
				<Sidebar page={page} setPage={setPage} collapsed={collapsed} onLogout={handleLogout} />
				<div className="main">
					<Header
						page={page}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
						theme={theme}
						onToggleTheme={toggleTheme}
					/>
					<div className="content">{renderPage()}</div>
				</div>
			</div>
			)}
			{view === "app" && workspace && <Workspace onClose={() => setWorkspace(false)} />}
		</>
	);
}
