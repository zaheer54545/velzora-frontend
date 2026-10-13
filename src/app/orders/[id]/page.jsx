import ProtectedRoute from "@/components/routing/ProtectedRoute";
import OrderDetails from "@/views/OrderDetail";

export default function Page() {
  return (
    <ProtectedRoute>
      <OrderDetails />
    </ProtectedRoute>
  );
}
