import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "FlexiLabour",
  description: "Find Helping Hand",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script src='https://api.mapbox.com/mapbox-gl-js/v3.7.0/mapbox-gl.js' strategy="beforeInteractive" />
        <link href='https://api.mapbox.com/mapbox-gl-js/v3.7.0/mapbox-gl.css' rel='stylesheet' />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body
        className="antialiased bg-blue-50"
      >
        {children}
      </body>
    </html>
  );
}
