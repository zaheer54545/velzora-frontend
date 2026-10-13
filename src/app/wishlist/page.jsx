import ProtectedRoute from "@/components/routing/ProtectedRoute";
import Wishlist from "@/views/Wishlist";

export default function Page() {
  return (
    <ProtectedRoute>
      <Wishlist />
    </ProtectedRoute>
  );
}
