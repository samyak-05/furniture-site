'use client';
import "./globals.css";
import Provider from "@/Provider";
import StoreProvider from "@/redux/StoreProvider";
import InitUser from "@/InitUser";
import { useSyncLayoutMode } from "@/hooks/useSyncLayoutMode";

function AppInitializer({ children }: { children: React.ReactNode }) {
  useSyncLayoutMode(); 
  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Provider>
          <StoreProvider>
            <AppInitializer>          
                <InitUser />
                {children}
            </AppInitializer>
          </StoreProvider>
        </Provider>
      </body>
    </html>
  );
}