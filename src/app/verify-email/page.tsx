"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CheckCircle, XCircle } from "lucide-react";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/verify-email?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setSuccess(true);
            toast.success("Email verified successfully! You can now login.");
            setTimeout(() => router.push("/login"), 3000);
          } else {
            setSuccess(false);
            toast.error(data.message || "Verification failed.");
          }
        })
        .catch(() => {
          setSuccess(false);
          toast.error("Something went wrong.");
        })
        .finally(() => setLoading(false));
    } else {
      setSuccess(false);
      toast.error("Invalid verification link");
      setLoading(false);
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 font-sansita">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        {loading ? (
          <>
            <AiOutlineLoading3Quarters className="mx-auto w-12 h-12 text-blue-600 animate-spin mb-4" />
            <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Verifying your email...
            </h2>
            <p className="text-gray-600 mt-2">
              Please wait a moment while we confirm your email address.
            </p>
          </>
        ) : success ? (
          <>
            <CheckCircle className="mx-auto w-14 h-14 text-green-500 mb-4" />
            <h2 className="text-2xl font-semibold text-green-600">
              Email Verified!
            </h2>
            <p className="text-gray-700 mt-2">
              Your account has been verified successfully. Redirecting to login...
            </p>
          </>
        ) : (
          <>
            <XCircle className="mx-auto w-14 h-14 text-red-500 mb-4" />
            <h2 className="text-2xl font-semibold text-red-600">
              Verification Failed
            </h2>
            <p className="text-gray-700 mt-2">
              The verification link is invalid or expired. Please try again.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
