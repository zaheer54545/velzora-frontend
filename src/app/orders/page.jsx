import ProtectedRoute from "@/components/routing/ProtectedRoute";
import Orders from "@/views/Orders";

export default function Page() {
  return (
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  );
}
