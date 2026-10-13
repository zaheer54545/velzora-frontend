import ProtectedRoute from "@/components/routing/ProtectedRoute";
import Addresses from "@/views/Addresses";

export default function Page() {
  return (
    <ProtectedRoute>
      <Addresses />
    </ProtectedRoute>
  );
}
