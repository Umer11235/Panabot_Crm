import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import "@/utils/theme/material-theme.css";
import { ThemeProvider } from "@/utils/theme/ThemeContext";
import RouteLayoutWrapper from "@/components/Layout/RouteLayoutWrapper";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Kanban Board - Material Design",
  description: "Project management with Material Design 3",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${roboto.variable} antialiased`}>
        <ThemeProvider>
          <RouteLayoutWrapper>{children}</RouteLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
