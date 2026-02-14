import { NavLink, useRouteError } from "react-router-dom";
import { Home, Mail, AlertTriangle } from "lucide-react";

export const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-4">
        <AlertTriangle className="w-20 h-20 text-primary-500 mb-6" />
        <h1 className="text-6xl font-bold font-heading text-primary-600 mb-4">404</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
          The page you were looking for could not be found.
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          It might have been moved or doesn't exist anymore.
        </p>
        <div className="flex gap-4">
          <NavLink
            to="/"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Home className="w-5 h-5" /> Go to Homepage
          </NavLink>
          <NavLink
            to="/contact"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Mail className="w-5 h-5" /> Contact Us
          </NavLink>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-4">
      <AlertTriangle className="w-20 h-20 text-primary-500 mb-6" />
      <h1 className="text-3xl font-bold font-heading text-gray-800 dark:text-white mb-4">
        Something went wrong
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The page you are looking for does not exist.
      </p>
      <NavLink to="/" className="btn-primary inline-flex items-center gap-2">
        <Home className="w-5 h-5" /> Go Home
      </NavLink>
    </section>
  );
};
