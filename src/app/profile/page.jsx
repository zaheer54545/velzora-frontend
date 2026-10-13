import ProtectedRoute from "@/components/routing/ProtectedRoute";
import Profile from "@/views/Profile";

export default function Page() {
  return (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  );
}
