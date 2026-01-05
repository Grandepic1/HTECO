"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/service/login";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			await login(username, password);
			window.location.href = "/dashboard";
		} catch (err) {
			setError(err.message || "Login gagal. Silakan coba lagi.");
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
			<div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50">
				<div className="text-center mb-8">
					<div className="text-4xl mb-2">🌿</div>
					<h1 className="text-2xl font-bold text-slate-800">Welcome Back</h1>
					<p className="text-slate-500 text-sm">
						Masuk untuk memantau jejak karbonmu.
					</p>
				</div>

				{error && (
					<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
						<p className="text-sm text-red-600 text-center">Username atau Password Salah!</p>
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
							USERNAME
						</label>
						<input
							onChange={(e) => setUsername(e.target.value)}
							type="text"
							placeholder="Yanto Kurniawati"
							className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 outline-none"
							required
							disabled={isLoading}
						/>
					</div>
					<div>
						<label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
							Password
						</label>
						<input
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							placeholder="••••••••"
							className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 outline-none"
							required
							disabled={isLoading}
						/>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
						{isLoading ? "Loading..." : "Login"}
					</button>
				</form>

				<p className="mt-6 text-center text-sm text-slate-500">
					Belum punya akun?{" "}
					<Link
						href="/auth/register"
						className="text-slate-900 font-semibold hover:underline">
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
