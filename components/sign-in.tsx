"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { client, signIn } from "@/lib/auth-client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getCallbackURL } from "@/lib/shared";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, startTransition] = useTransition();
	const [rememberMe] = useState(true);
	const router = useRouter();
	const params = useSearchParams();

	return (
		<Card className="max-w-md rounded-none">
			<CardHeader>
				<CardTitle className="text-lg md:text-xl">Iniciar Sesión</CardTitle>
				<CardDescription className="text-xs md:text-sm">
                    Iniciar Sesión para continuar
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Correo Electronico</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							required
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							value={email}
						/>
					</div>

					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Contraseña</Label>
						</div>

						<Input
							id="password"
							type="password"
							autoComplete="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<Button
						type="submit"
						className="w-full flex items-center justify-center"
						disabled={loading}
						onClick={async () => {
							startTransition(async () => {
								await signIn.email(
									{ email, password, rememberMe },
									{
										onSuccess(context) {
											toast.success("Se ha iniciado sesión correctamente");
											router.push(getCallbackURL(params));
										},
										onError(context) {
											toast.error(context.error.message);
										},
									},
								);
							});
						}}
					>
						<div className="flex items-center justify-center w-full relative">
							{loading ? (
								<Loader2 size={16} className="animate-spin" />
							) : (
								"Iniciar Sesión"
							)}
						</div>
					</Button>

				</div>
			</CardContent>
		</Card>
	);
}