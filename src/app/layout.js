import "./globals.css";
import Providers from "./providers";
import MainHeader from "@/components/main-header";
import SiteFooter from "@/components/site-footer";

export const metadata = {
  title: "SareeHub",
  description: "Handpicked, handwoven sarees from across India.",
  icons: {
    icon: "/favicon-lotus.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <MainHeader />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
