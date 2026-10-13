import ProtectedRoute from "@/components/routing/ProtectedRoute";
import AccountDashboard from "@/components/layout/AccountDashboard";

export default function Page() {
  return (
    <ProtectedRoute>
      <AccountDashboard />
    </ProtectedRoute>
  );
}
