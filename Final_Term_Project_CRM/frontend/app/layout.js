import "../styles/globals.css";
import { DM_Sans } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-dm",
});

export const metadata = {
  title: "Orbit-CRM",
  description: "Manage Better, Connect Stronger.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@500;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={dmSans.className}
        style={{ background: "var(--clr-bg)", fontFamily: "var(--font-body)" }}
      >
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#161616",
                color: "#F5F5F5",
                border: "1px solid rgba(245,158,11,0.25)",
                borderRadius: "12px",
                fontSize: "13.5px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: "600",
                boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                letterSpacing: "-0.01em",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}