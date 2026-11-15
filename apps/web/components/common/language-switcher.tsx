"use client";

import { ChevronDown, Globe, Languages } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { useOptionalDictionary } from "@/components/providers/dictionary-provider";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setLocaleServer } from "@/lib/actions/locale";
import { hasLocale, LOCALES, type Locale } from "@/lib/locale";

const LOCALE_LABELS: Record<Locale, string> = {
	en: "English",
	ko: "한국어",
	"pt-BR": "Português (Brasil)",
	pl: "Polski",
	ru: "Русский",
};

const locales = LOCALES;

function useLocaleSwitch() {
	const params = useParams<{ locale?: string }>();
	const pathname = usePathname();
	const router = useRouter();
	const [pending, startTransition] = useTransition();

	const currentLocale: Locale = hasLocale(String(params?.locale))
		? (params.locale as Locale)
		: "en";

	function buildPath(next: Locale) {
		const segments = pathname.split("/");
		if (segments[1] && hasLocale(segments[1])) {
			segments[1] = next;
		} else {
			segments.splice(1, 0, next);
		}
		return segments.join("/") || "/";
	}

	function onSelect(next: string) {
		if (!hasLocale(next) || next === currentLocale) return;
		startTransition(async () => {
			await setLocaleServer(next);
			router.push(buildPath(next));
			router.refresh();
		});
	}

	return { currentLocale, pending, onSelect };
}

/**
 * Standalone trigger for contexts without an existing dropdown menu
 * (e.g. the login/signup pages).
 */
export function LanguageSwitcher({ showLabel = false }: { showLabel?: boolean }) {
	const { currentLocale, pending, onSelect } = useLocaleSwitch();

	if (showLabel) {
		return (
			<div>
				<Globe size={14} data-language-icon="globe" aria-hidden="true" />
				<select aria-label="Language" value={currentLocale} disabled={pending} onChange={(event) => onSelect(event.target.value)}>
					{locales.map((locale) => <option key={locale} value={locale}>{LOCALE_LABELS[locale]}</option>)}
				</select>
				<ChevronDown size={14} data-language-icon="chevron" aria-hidden="true" />
			</div>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size={showLabel ? "default" : "icon"} disabled={pending} aria-label="Language">
					<Languages aria-hidden="true" />
					{showLabel && <span>{LOCALE_LABELS[currentLocale]}</span>}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuRadioGroup value={currentLocale} onValueChange={onSelect}>
					{locales.map((locale) => (
						<DropdownMenuRadioItem key={locale} value={locale}>
							{LOCALE_LABELS[locale]}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

/**
 * Submenu variant for nesting inside an already-open DropdownMenu
 * (e.g. the workspace nav user menu).
 */
export function LanguageSwitcherSubmenu() {
	const { currentLocale, pending, onSelect } = useLocaleSwitch();
	const dict = useOptionalDictionary();

	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger disabled={pending}>
				<Languages />
				{dict?.common?.language ?? "Language"}
			</DropdownMenuSubTrigger>
			<DropdownMenuSubContent>
				<DropdownMenuRadioGroup value={currentLocale} onValueChange={onSelect}>
					{locales.map((locale) => (
						<DropdownMenuRadioItem key={locale} value={locale}>
							{LOCALE_LABELS[locale]}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuSubContent>
		</DropdownMenuSub>
	);
}
