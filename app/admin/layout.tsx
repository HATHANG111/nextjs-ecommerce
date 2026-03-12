import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppSidebar from "@/components/admin/AppSideBar";
import Navbar from "@/components/admin/NavBar";
import { ThemeProvider } from "@/components/providers/Providers";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin panel",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const cookieStore =  await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang="en" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={defaultOpen}>
            <div className="flex min-h-screen w-full">

              <AppSidebar />

              <main className="flex-1 flex flex-col">
                <Navbar />

                <div className="flex-1 p-4">
                  {children}
                </div>

              </main>

            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}