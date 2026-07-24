import { redirect } from "next/navigation";
import { createAdminSession, verifyAdminCredentials } from "@/lib/auth";

async function login(formData: FormData) {
  "use server";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!verifyAdminCredentials(email, password)) {
    redirect("/admin/login?error=1");
  }

  await createAdminSession();
  redirect("/admin");
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand">
      <form
        action={login}
        className="bg-white p-8 rounded-lg border border-line w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="font-display text-xl font-bold text-ink">Admin Login</h1>
        {error && (
          <p className="text-sm text-coral bg-coral/10 px-3 py-2 rounded">
            Invalid email or password
          </p>
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-harbor"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-harbor"
        />
        <button
          type="submit"
          className="bg-harbor hover:bg-harbor-dark transition-colors text-white font-semibold py-2.5 rounded-md"
        >
          Log In
        </button>
      </form>
    </div>
  );
}