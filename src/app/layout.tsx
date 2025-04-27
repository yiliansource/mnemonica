import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Link from "next/link";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "mnemonica trainer",
    description: "a simple training application for the mnemonica stacks.",
};

const navigation: {
    label: string;
    href: string;
}[] = [
    {
        label: "The Stack",
        href: "/stack",
    },
    {
        label: "Trainers",
        href: "/trainers",
    },
];

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={clsx(...[geistSans, geistMono].map((f) => f.variable), `antialiased`)}>
                <div className={`flex flex-col mx-auto w-full px-3 max-w-4xl min-h-dvh justify-stretch`}>
                    <header className="flex flex-row py-4 justify-between items-center mb-2">
                        <div>
                            <h1 className="text-lg font-bold text-neutral-300">
                                <Link href="/">mnemonica</Link>
                            </h1>
                        </div>
                        <nav className="flex flex-row gap-2 text-sm">
                            {navigation
                                .map((nav) => (
                                    <span key={nav.href} className="text-neutral-400">
                                        <Link href={nav.href}>{nav.label}</Link>
                                    </span>
                                ))
                                .flatMap((n, i, a) => [
                                    n,
                                    i !== a.length - 1 && (
                                        <span key={i} className="text-neutral-600">
                                            &bull;
                                        </span>
                                    ),
                                ])}
                        </nav>
                    </header>
                    <main className="flex grow flex-col">{children}</main>
                    <footer className="py-2">
                        <p className="text-sm text-neutral-600">
                            <Link href="https://hornik.dev">made by ian hornik</Link>
                        </p>
                    </footer>
                </div>
            </body>
        </html>
    );
}
