"use client";

import type { FormState } from "@schema";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { useSiteFeatures } from "@/components/providers/site-features-provider";
import { login } from "@/lib/actions/auth";
import type { Dictionary } from "@/lib/dictionaries";
import { resolveDictMessage } from "@/lib/resolve-dict-message";
import { AuthOAuthButtons, AuthPasswordField, type AuthProviders } from "./auth-controls";
import styles from "./auth.module.css";

export function LoginForm({ oidc, dict }: { oidc?: AuthProviders; dict: Dictionary }) {
	const { localLogin } = useSiteFeatures();
	const [formState, formAction, isPending] = useActionState<FormState, FormData>(login, {});
	return (
		<>
			<AuthOAuthButtons oidc={oidc} dict={dict} divider={localLogin} />
			{!localLogin && !oidc?.googleEnabled && !oidc?.genericEnabled && <p role="alert" className={styles.notice}>{dict.auth.noLoginMethodsEnabled}</p>}
			{localLogin && <form action={formAction} className={styles.form} aria-labelledby="auth-heading" aria-busy={isPending}>
				<input type="hidden" name="locale" value={dict.locale} />
				<div className={styles.field}>
					<label htmlFor="email">{dict.auth.email}</label>
					<input className={styles.input} id="email" name="email" type="email" placeholder={dict.auth.emailPlaceholder} required autoComplete="username" autoCapitalize="none" autoCorrect="off" spellCheck={false} />
				</div>
				<AuthPasswordField id="password" name="password" label={dict.auth.password} dict={dict} placeholder={dict.auth.passwordPlaceholder} required autoComplete="current-password" />
				{formState.error && <p role="alert" className={styles.error}>{resolveDictMessage(dict.actions, formState.error)}</p>}
				{formState.message && !formState.error && <p role="status" className={styles.success}>{resolveDictMessage(dict.actions, formState.message)}</p>}
				<button type="submit" className={styles.submit} disabled={isPending}>
					{isPending && <Loader2 size={18} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />}
					{dict.auth.signIn}
				</button>
			</form>}
			<div className={styles.accountSwitch}>
				<div className={styles.divider}>{dict.auth.or}</div>
				<Link href={`/${dict.locale}/auth/signup`} className={styles.secondaryButton}>{dict.auth.signUp}</Link>
			</div>
		</>
	);
}
