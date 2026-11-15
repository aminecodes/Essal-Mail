import { Suspense } from "react";
import Link from "next/link";
import * as React from "react";

import { LoginForm } from "@/components/auth/login-form";
import EssalMailLogo from "@/components/common/essal-mail-logo";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import Loading from "@/app/loading";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { getGenericOidcSettings } from "@/lib/generic-oidc";

type LoginPageProps = {
	params: Promise<{ locale: Locale }>;
	searchParams: Promise<{ message?: string }>;
};

async function LoginContent({ params, searchParams }: LoginPageProps) {
	const [sParams, nParams] = await Promise.all([searchParams, params]);

	const dict = await getDictionary(nParams.locale);

	const showSignupDisabledMessage = sParams.message === "signup_disabled";

	const googleEnabled =
		process.env.OIDC_GOOGLE_CLIENT_ID && process.env.OIDC_GOOGLE_CLIENT_SECRET;

	const genericOidc = getGenericOidcSettings();

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

				{showSignupDisabledMessage && (
					<div className="rounded-md border border-yellow-200 bg-yellow-50 p-3">
						<p className="text-sm text-yellow-800">
							User registration is currently disabled. Please contact your
							administrator for access.
						</p>
					</div>
				)}

				<LoginForm
					dict={dict}
					oidc={{
						googleEnabled: !!googleEnabled,
						genericEnabled: !!genericOidc,
						genericName: genericOidc?.providerName,
					}}
				/>
			</div>
		</div>
	);
}

export function LoginPage(props: LoginPageProps) {
	return (
		<Suspense fallback={<Loading />}>
			<LoginContent {...props} />
		</Suspense>
	);
}
