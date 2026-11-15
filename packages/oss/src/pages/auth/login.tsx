import { Suspense } from "react";

import { LoginForm } from "@/components/auth/login-form";
import { AuthShell } from "@/components/auth/auth-shell";
import styles from "@/components/auth/auth.module.css";
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
		<AuthShell dict={dict}>
			{showSignupDisabledMessage && <p role="alert" className={styles.notice}>User registration is currently disabled. Please contact your administrator for access.</p>}
			<LoginForm
				dict={dict}
				oidc={{
					googleEnabled: !!googleEnabled,
					genericEnabled: !!genericOidc,
					genericName: genericOidc?.providerName,
				}}
			/>
		</AuthShell>
	);
}

export function LoginPage(props: LoginPageProps) {
	return (
		<Suspense fallback={<Loading />}>
			<LoginContent {...props} />
		</Suspense>
	);
}
