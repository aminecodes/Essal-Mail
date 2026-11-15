import type { Metadata } from "next";

export const DISTRIBUTION_METADATA: Metadata = {
	title: "Essal Mail",
	applicationName: "Essal Mail",
	description: "Email, calendar, contacts and files, together in Essal Mail.",
	manifest: "/site.webmanifest",
	icons: {
		icon: [
			{ url: "/favicons/mail/favicon.svg", type: "image/svg+xml" },
			{ url: "/favicons/mail/favicon-32x32.png", sizes: "32x32", type: "image/png" },
		],
		apple: "/favicons/mail/apple-touch-icon.png",
	},
};

export function DISTRIBUTION_HEAD() {
	return null;
}
