import "./globals.css";

export const metadata = {
  title: "SareeHub",
  description: "SareeHub web app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
