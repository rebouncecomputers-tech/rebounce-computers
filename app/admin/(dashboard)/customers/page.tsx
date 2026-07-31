import { getAllCustomers } from "@/lib/queries";

export default async function CustomersPage() {
  const customers = await getAllCustomers();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display font-semibold text-2xl uppercase text-ink">
          Customers
        </h1>
        <p className="text-sm text-ink/50 mt-1">{customers.length} registered accounts</p>
      </div>

      {customers.length === 0 ? (
        <div className="bg-white border border-line rounded-lg py-16 text-center">
          <p className="text-ink/50">No customers have registered yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-line overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-sand border-b border-line">
              <tr className="text-left text-ink/60">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Orders</th>
                <th className="px-4 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-2.5 font-medium text-ink">
                    {customer.firstName} {customer.lastName}
                  </td>
                  <td className="px-4 py-2.5 text-ink/70">{customer.email}</td>
                  <td className="px-4 py-2.5 text-ink/70">{customer.phone ?? "—"}</td>
                  <td className="px-4 py-2.5 font-mono text-ink/70">{customer._count.orders}</td>
                  <td className="px-4 py-2.5 text-ink/50 font-mono text-xs">
                    {new Date(customer.createdAt).toLocaleDateString("en-KE")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}