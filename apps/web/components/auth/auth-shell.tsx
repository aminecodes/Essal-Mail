import type { ReactNode } from "react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ArrowLeft } from "lucide-react";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./auth.module.css";

const bodyFont = Inter({ subsets: ["latin"], variable: "--auth-font-body" });
const headingFont = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--auth-font-heading" });

export function AuthShell({ children, dict, signup = false }: {
	children: ReactNode;
	dict: Dictionary;
	signup?: boolean;
}) {
	return (
		<main className={`${styles.page} ${bodyFont.variable} ${headingFont.variable}`}>
			<aside className={styles.brandPanel} aria-label="Essal Mail">
				<header className={styles.brandHeader}>
					<a href="https://essal.cloud" className={styles.brand} aria-label="Essal Mail — Essal Cloud">
						<img src="/brand/essal-white.svg" alt="Essal" width={155} height={50} />
						<span>Essal Mail</span>
					</a>
					<a href="https://essal.cloud" className={styles.backLink}>
						<ArrowLeft size={16} aria-hidden="true" />
						{dict.auth.backToWebsite}
					</a>
				</header>
				<div className={styles.hero}>
					<h1>{dict.auth.brandHeadlineFirst}<br />{dict.auth.brandHeadlineSecond}</h1>
					<p>{dict.auth.brandDescription}</p>
				</div>
			</aside>
			<section className={styles.formPanel} aria-labelledby="auth-heading">
				<div className={styles.formContainer}>
					<header className={styles.formHeader}>
						<h2 id="auth-heading">{signup ? dict.auth.welcome : dict.auth.welcomeBack}</h2>
						<p>{signup ? dict.auth.signupSubtitle : dict.auth.loginSubtitle}</p>
					</header>
					{children}
					<footer className={styles.footer}>
						<p>© Essal Mail. All rights reserved.</p>
						<div className={styles.language}><LanguageSwitcher showLabel /></div>
					</footer>
				</div>
			</section>
		</main>
	);
}
