import ProtectedRoute from "@/components/routing/ProtectedRoute";
import Checkout from "@/views/Checkout";

export default function Page() {
  return (
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  );
}
