import type { Metadata } from "next";
import AuthProvider from "@/components/authProvider";
import "./globals.css";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import { ToastContainer } from "react-toastify";
import { GlobalContextProvider } from "@/context/globalContext";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";

export const metadata: Metadata = {
  title: "buy property | invest in land",
  description: "we help clients to get land at their desired locations",
  keywords:
    " land, property, real estate, invest, buy lan at any loction, land at affordable price",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalContextProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            <NavBar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalContextProvider>
  );
}
