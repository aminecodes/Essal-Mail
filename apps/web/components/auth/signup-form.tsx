"use client";

import type { FormState } from "@schema";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import { signup } from "@/lib/actions/auth";
import type { Dictionary } from "@/lib/dictionaries";
import { resolveDictMessage } from "@/lib/resolve-dict-message";
import { AuthOAuthButtons, AuthPasswordField, type AuthProviders } from "./auth-controls";
import styles from "./auth.module.css";

export function SignupForm({ oidc, dict }: { oidc?: AuthProviders; dict: Dictionary }) {
	const passwordRef = useRef<HTMLInputElement>(null);
	const retypeRef = useRef<HTMLInputElement>(null);
	const [mismatch, setMismatch] = useState(false);
	const [formState, formAction, isPending] = useActionState<FormState, FormData>(signup, {});
	function validatePasswords() {
		const invalid = Boolean(retypeRef.current?.value && passwordRef.current?.value !== retypeRef.current.value);
		retypeRef.current?.setCustomValidity(invalid ? dict.auth.passwordsDoNotMatch : "");
		setMismatch(invalid);
		return !invalid;
	}
	function clearMismatch() {
		retypeRef.current?.setCustomValidity("");
		setMismatch(false);
	}
	return (
		<>
			<AuthOAuthButtons oidc={oidc} dict={dict} signup />
			<form action={formAction} className={styles.form} aria-labelledby="auth-heading" aria-busy={isPending} onSubmitCapture={(event) => {
				if (!validatePasswords()) { event.preventDefault(); retypeRef.current?.reportValidity(); retypeRef.current?.focus(); }
			}}>
				<input type="hidden" name="locale" value={dict.locale} />
				<div className={styles.field}>
					<label htmlFor="email">{dict.auth.email}</label>
					<input className={styles.input} id="email" name="email" type="email" placeholder={dict.auth.emailPlaceholder} required autoComplete="username" autoCapitalize="none" autoCorrect="off" spellCheck={false} />
				</div>
				<div className={styles.field}>
					<AuthPasswordField id="password" name="password" label={dict.auth.password} dict={dict} required minLength={8} autoComplete="new-password" inputRef={passwordRef} aria-describedby="password-hint" onBlur={validatePasswords} onInput={clearMismatch} />
					<p id="password-hint" className={styles.hint}>{dict.auth.passwordHint}</p>
				</div>
				<div className={styles.field}>
					<AuthPasswordField id="retypePassword" name="retypePassword" label={dict.auth.retype} dict={dict} required autoComplete="new-password" inputRef={retypeRef} aria-invalid={mismatch || undefined} aria-describedby={mismatch ? "password-mismatch" : undefined} onBlur={validatePasswords} onInput={clearMismatch} />
					{mismatch && <p id="password-mismatch" className={styles.error} role="alert">{dict.auth.passwordsDoNotMatch}</p>}
				</div>
				<div className={styles.field}>
					<label htmlFor="workspaceName">{dict.auth.workspaceName}</label>
					<input className={styles.input} id="workspaceName" name="workspaceName" type="text" required autoComplete="organization" />
				</div>
				{formState.error && <p role="alert" className={styles.error}>{resolveDictMessage(dict.actions, formState.error)}</p>}
				<button type="submit" className={styles.submit} disabled={isPending}>
					{isPending && <Loader2 size={18} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />}
					{dict.auth.signUp}
				</button>
			</form>
			<p className={styles.switchLink}>{dict.auth.accountPresent}{" "}<Link href={`/${dict.locale}/auth/login`}>{dict.auth.signIn}</Link></p>
		</>
	);
}
