'use client';
import "./globals.css";
import Provider from "@/Provider";
import StoreProvider from "@/redux/StoreProvider";
import { Suspense, useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    // GLOBAL ROUTER UNFREEZER: Browser ke back/forward events ko direct patch karne ke liye
    const handleGlobalNavigation = (event: PopStateEvent) => {
      // Hardware navigation refresh execute hota hai bina client app cache ko freeze kiye
      window.location.reload();
    };

    window.addEventListener('popstate', handleGlobalNavigation);
    return () => {
      window.removeEventListener('popstate', handleGlobalNavigation);
    };
  }, []);

  return (
    <html lang="en">
      <body className="antialiased">
        <Provider>
          <StoreProvider>
          <Suspense fallback={<div className="fixed inset-0 bg-[#FAF9F6]" />}>
            {children}
          </Suspense>
          </StoreProvider>
        </Provider>
      </body>
    </html>
  );
}