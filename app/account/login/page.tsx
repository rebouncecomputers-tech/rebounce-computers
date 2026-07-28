import Link from "next/link";
import { loginCustomer } from "../actions";
import AuthLayout from "@/components/authLayout";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const { error, callbackUrl } = await searchParams;
  return (
    <AuthLayout>
      <h1 className="font-display font-semibold text-3xl uppercase text-ink mb-2 text-center">
        Welcome Back
      </h1>
      <p className="text-base text-ink/60 mb-8 text-center">
        Log in to continue shopping.
      </p>

      {error === "invalid" && (
        <p className="text-sm text-coral bg-coral/10 px-3 py-2 rounded mb-4 text-center">
          Invalid email or password.
        </p>
      )}

      <form action={loginCustomer} className="flex flex-col gap-4 text-left">
          <input type="hidden" name="callbackUrl" value={callbackUrl ?? "/"} />
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
            className="w-full border border-line rounded-lg px-4 py-3 text-base outline-none focus:border-harbor"
          />
        </div>
        <button
          type="submit"
          className="bg-coral hover:bg-coral-dark transition-colors text-white font-display font-semibold uppercase text-base py-3.5 rounded-full mt-2"
        >
          Log In
        </button>
      </form>

      <p className="text-sm text-ink/60 text-center mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/account/register" className="text-harbor font-semibold hover:underline">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}