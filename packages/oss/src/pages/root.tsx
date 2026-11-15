import { redirect } from "next/navigation";
import { DISTRIBUTION_CONFIG } from "@distribution/config";

export async function RootPage() {
	redirect(`/${DISTRIBUTION_CONFIG.defaultLocale}/auth/login`);
}
