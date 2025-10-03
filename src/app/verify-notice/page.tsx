"use client"
import { Mail } from "lucide-react";

/* eslint-disable react/no-unescaped-entities */
export default function VerifyNotice() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 font-sansita px-4">
      <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <Mail className="mx-auto text-blue-600 w-20 h-20 mb-6 animate-bounce" />
        <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4">
          Check Your Email
        </h2>
        <p className="text-gray-700 text-base mb-6">
          We've sent a verification link to your email. Please click the link to
          verify your account before logging in.
        </p>
        <button
          onClick={() => window.location.href = '/login'}
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
