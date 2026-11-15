import { getPublicEnv } from "@schema";
import { redirect } from "next/navigation";

import { SignupForm } from "@/components/auth/signup-form";
import { AuthShell } from "@/components/auth/auth-shell";
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
		<AuthShell dict={dict} signup>
			<SignupForm
				oidc={{
					googleEnabled: !!googleEnabled,
					genericEnabled: !!genericOidc,
					genericName: genericOidc?.providerName,
				}}
				dict={dict}
			/>
		</AuthShell>
	);
}
