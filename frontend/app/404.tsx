import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <h1 className="text-6xl font-bold text-amber-900 mb-4">404</h1>
      <p className="text-2xl text-amber-700 mb-8">Page Not Found</p>
      <Link href="/" className="text-orange-600 underline hover:text-orange-800">Go back home</Link>
    </div>
  );
}
