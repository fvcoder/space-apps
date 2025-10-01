import { SignInButton, SignInFallback } from "@/components/sign-in-btn";
import { cn } from "@/lib/utils";
import { textVariants } from "@/style/text";
import { Suspense } from "react";

export default async function Home() {
	return (
		<div className="min-h-[80vh] flex items-center justify-center overflow-hidden no-visible-scrollbar px-6 md:px-0">
			<main className="flex flex-col gap-4 row-start-2 items-center justify-center">
				<div>
          <h1 className={textVariants({ size: "h1" })}>Nasa Space Apps</h1>
          <p className={cn(textVariants({ color: "secondary" }), "text-center mt-4")}>Acreditacion</p>
        </div>
				<div className="md:w-10/12 w-full flex flex-col gap-4">
					{/* @ts-ignore */}
					<Suspense fallback={<SignInFallback />}>
						{/* @ts-ignore */}
						<SignInButton />
					</Suspense>
				</div>
			</main>
		</div>
	);
}