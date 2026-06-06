import "./globals.css";
import Provider from "@/Provider";
import StoreProvider from "@/redux/StoreProvider";
import InitUser from "@/InitUser";
import AppInitializer from "@/components/AppInitializer";

export const analyticsConfig = {
  title: "Vanaura Living",
  description: "Premium Luxury Interiors",
};

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