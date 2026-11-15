"use client";

import { Eye, EyeOff } from "lucide-react";
import { IconBrandGoogle, IconLogin2 } from "@tabler/icons-react";
import { useState, type InputHTMLAttributes, type Ref } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./auth.module.css";

export type AuthProviders = {
	googleEnabled?: boolean;
	genericEnabled?: boolean;
	genericName?: string;
};

export function AuthOAuthButtons({ oidc, dict, signup = false, divider = true }: {
	oidc?: AuthProviders;
	dict: Dictionary;
	signup?: boolean;
	divider?: boolean;
}) {
	if (!oidc?.googleEnabled && !oidc?.genericEnabled) return null;
	return (
		<div className={styles.oauthGroup}>
			{oidc.googleEnabled && <a href="/api/auth/oidc/google" className={styles.oauth}>
				<IconBrandGoogle size={20} aria-hidden="true" />
				{signup ? dict.auth.signupWithGoogle : dict.auth.loginWithGoogle}
			</a>}
			{oidc.genericEnabled && <a href="/api/auth/oidc/generic" className={styles.oauth}>
				<IconLogin2 size={20} aria-hidden="true" />
				{signup ? dict.auth.signupWithProviderPrefix : dict.auth.loginWithProviderPrefix}{oidc.genericName || "SSO"}
			</a>}
			{divider && <div className={styles.divider}>{dict.auth.continueWith}</div>}
		</div>
	);
}

export function AuthPasswordField({ label, dict, inputRef, ...props }: InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	dict: Dictionary;
	inputRef?: Ref<HTMLInputElement>;
}) {
	const [visible, setVisible] = useState(false);
	return (
		<div className={styles.field}>
			<label htmlFor={props.id}>{label}</label>
			<div className={styles.passwordWrapper}>
				<input {...props} ref={inputRef} type={visible ? "text" : "password"} className={styles.input} />
				<button type="button" className={styles.passwordToggle} aria-label={visible ? dict.auth.hidePassword : dict.auth.showPassword} aria-pressed={visible} aria-controls={props.id} onClick={() => setVisible(!visible)}>
					{visible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
				</button>
			</div>
		</div>
	);
}
