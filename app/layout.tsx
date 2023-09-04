import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import "../styles/globals.css";

const title = "Magic Meal Generator";
const description = "Create a meal recipe in seconds!";

export const metadata: Metadata = {
    title,
    description,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
