import Link from "next/link";
import { registerCustomer } from "../actions";
import AuthLayout from "@/components/authLayout";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <AuthLayout>
      <h1 className="font-display font-semibold text-3xl uppercase text-ink mb-2 text-center">
        Create Account
      </h1>
      <p className="text-base text-ink/60 mb-8 text-center">
        Join Rebounce in under a minute.
      </p>

      {error === "exists" && (
        <p className="text-sm text-coral bg-coral/10 px-3 py-2 rounded mb-4 text-center">
          An account with that email already exists.
        </p>
      )}

      <form action={registerCustomer} className="flex flex-col gap-4 text-left">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-ink block mb-1.5">First Name</label>
            <input
              name="firstName"
              required
              className="w-full border border-line rounded-lg px-4 py-3 text-base outline-none focus:border-harbor"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink block mb-1.5">Last Name</label>
            <input
              name="lastName"
              required
              className="w-full border border-line rounded-lg px-4 py-3 text-base outline-none focus:border-harbor"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-ink block mb-1.5">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-line rounded-lg px-4 py-3 text-base outline-none focus:border-harbor"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink block mb-1.5">Password</label>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            className="w-full border border-line rounded-lg px-4 py-3 text-base outline-none focus:border-harbor"
          />
          <p className="text-xs text-ink/40 mt-1">Minimum 6 characters</p>
        </div>
        <button
          type="submit"
          className="bg-coral hover:bg-coral-dark transition-colors text-white font-display font-semibold uppercase text-base py-3.5 rounded-full mt-2"
        >
          Create Account
        </button>
      </form>

      <p className="text-sm text-ink/60 text-center mt-6">
        Already have an account?{" "}
        <Link href="/account/login" className="text-harbor font-semibold hover:underline">
          Log In
        </Link>
      </p>
    </AuthLayout>
  );
}