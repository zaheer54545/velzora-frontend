import "./globals.css";
import ClientRoot from "./ClientRoot";

export const metadata = {
  title: "Velzora - Future Tech, Delivered",
  description:
    "Velzora - shop the latest mobiles, laptops, gaming gear, audio, cameras and TVs with fast delivery.",
  applicationName: "Velzora",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Geist:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="root">
          <ClientRoot>{children}</ClientRoot>
        </div>
      </body>
    </html>
  );
}
