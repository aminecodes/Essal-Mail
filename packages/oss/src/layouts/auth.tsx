import { redirect } from "next/navigation";

import { getDefaultWorkspacePath, isSignedIn } from "@/lib/actions/auth";
import { withLocale } from "@/lib/utils";

export async function AuthLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const user = await isSignedIn();

	if (user) {
		redirect(withLocale(locale, await getDefaultWorkspacePath(user)));
	}

	return <div className="flex min-h-screen flex-col"><div className="flex-1">{children}</div><nav aria-label="Essal legal policies" className="flex flex-wrap justify-center gap-4 p-4 text-xs">
              <a href="https://legal.essal.it.com/terms" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms</a>
              <a href="https://legal.essal.it.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy</a>
              <a href="https://legal.essal.it.com/refunds" target="_blank" rel="noopener noreferrer" className="hover:underline">Refunds</a>
            </nav></div>;
}
