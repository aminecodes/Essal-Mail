"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import EssalMailLogo from "@/components/common/essal-mail-logo";
import { hasLocale, type Locale } from "@/lib/locale";

// Root error boundary — sits outside app/[locale]/layout.tsx, so there is no
// DictionaryProvider here. See not-found-view.tsx for the same pattern.
const COPY: Record<
	Locale,
	{ title: string; body: string; retry: string; back: string }
> = {
	en: {
		title: "Something went wrong",
		body: "An unexpected error occurred. You can try again, or head back home.",
		retry: "Try again",
		back: "Back to Essal Mail",
	},
	"pt-BR": {
		title: "Algo deu errado",
		body: "Ocorreu um erro inesperado. Você pode tentar novamente ou voltar para o início.",
		retry: "Tentar novamente",
		back: "Voltar ao Essal Mail",
	},
	ko: {
		title: "Something went wrong",
		body: "An unexpected error occurred. You can try again, or head back home.",
		retry: "Try again",
		back: "Back to Essal Mail",
	},
	pl: {
		title: "Coś poszło nie tak",
		body: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie albo wróć na stronę główną.",
		retry: "Spróbuj ponownie",
		back: "Wróć do Essal Mail",
	},
	ru: {
		title: "Что-то пошло не так",
		body: "Произошла непредвиденная ошибка. Попробуйте ещё раз или вернитесь на главную страницу.",
		retry: "Попробовать снова",
		back: "Вернуться в Essal Mail",
	},
};

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const pathname = usePathname();
	const firstSegment = pathname.split("/")[1] ?? "";
	const locale = hasLocale(firstSegment) ? firstSegment : "en";
	const copy = COPY[locale];

	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 text-center">
			<Link href={`/${locale}`} className="flex items-center gap-2 font-medium">
				<EssalMailLogo size={40} />
				<span className="text-2xl font-medium">Essal Mail</span>
			</Link>
			<div className="space-y-2">
				<h1 className="text-2xl font-semibold">{copy.title}</h1>
				<p className="text-sm text-muted-foreground">{copy.body}</p>
			</div>
			<div className="flex gap-4">
				<button
					type="button"
					onClick={reset}
					className="text-sm underline underline-offset-4"
				>
					{copy.retry}
				</button>
				<Link
					href={`/${locale}`}
					className="text-sm underline underline-offset-4"
				>
					{copy.back}
				</Link>
			</div>
		</div>
	);
}
