import type { SVGProps } from "react";

type EssalMailLogoProps = SVGProps<SVGSVGElement> & {
	size?: number | string;
};

export default function EssalMailLogo({
	size = 40,
	color = "#0066FF",
	...props
}: EssalMailLogoProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={size}
			height={size}
			fill="none"
			stroke={color}
			strokeWidth={2.25}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
			{...props}
		>
			<path d="M14 3.5h-4c-3.77 0-5.66 0-6.83 1.17S2 7.73 2 11.5v1c0 3.77 0 5.66 1.17 6.83S6.23 20.5 10 20.5h4c3.77 0 5.66 0 6.83-1.17S22 16.27 22 12.5v-1c0-3.77 0-5.66-1.17-6.83S17.77 3.5 14 3.5Z" />
			<path d="m2.75 6.25 6.63 5.3c1.25 1 1.87 1.5 2.62 1.5s1.37-.5 2.62-1.5l6.63-5.3" />
		</svg>
	);
}
