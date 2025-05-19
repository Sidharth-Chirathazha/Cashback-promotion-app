import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useLocation,
} from "@remix-run/react";

import "./tailwind.css";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter&display=swap",
  },
];

export function Layout({ children }) {
  const location = useLocation();

  return (
    <html lang="en" className="h-full bg-gray-100">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen text-gray-900">
        {/* Top Nav */}
        <nav className="bg-white shadow mb-6">
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <span className="font-bold text-lg">Admin Dashboard</span>
            <div className="space-x-4">
              <Link
                to="/dashboard"
                className={`${
                  location.pathname === "/dashboard" ? "font-semibold text-blue-600" : ""
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/cashback-settings"
                className={`${
                  location.pathname === "/cashback-settings" ? "font-semibold text-blue-600" : ""
                }`}
              >
                Cashback Settings
              </Link>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4">{children}</main>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
