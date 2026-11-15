import { getPublicEnv } from "@schema";
import Link from "next/link";
import { redirect } from "next/navigation";

import { SignupForm } from "@/components/auth/signup-form";
import EssalMailLogo from "@/components/common/essal-mail-logo";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { getGenericOidcSettings } from "@/lib/generic-oidc";
import { withLocale } from "@/lib/utils";

type SignupPageProps = {
	params: Promise<{ locale: Locale }>;
};

export async function SignupPage(props: SignupPageProps) {
	const { DISABLE_SIGNUP } = getPublicEnv();

	const googleEnabled =
		process.env.OIDC_GOOGLE_CLIENT_ID && process.env.OIDC_GOOGLE_CLIENT_SECRET;

	const genericOidc = getGenericOidcSettings();
	const nParams = await props.params;

	if (DISABLE_SIGNUP) {
		redirect(withLocale(nParams.locale, "/auth/login?message=signup_disabled"));
	}

	const dict = await getDictionary(nParams.locale);

	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<div className="flex items-center justify-between">
					<Link href="/" className="flex min-w-0 items-center gap-2 font-medium">
						<EssalMailLogo size={48} className="shrink-0" />
						<span className="truncate text-3xl font-semibold tracking-tight">Essal Mail</span>
					</Link>

					<LanguageSwitcher />
				</div>

				<SignupForm
					oidc={{
						googleEnabled: !!googleEnabled,
						genericEnabled: !!genericOidc,
						genericName: genericOidc?.providerName,
					}}
					dict={dict}
				/>
				<p className="text-center text-xs text-muted-foreground">
					<a href="https://github.com/aminecodes/Essal-Mail" className="underline underline-offset-4">Essal Mail source code</a>
				</p>
			</div>
		</div>
	);
}
