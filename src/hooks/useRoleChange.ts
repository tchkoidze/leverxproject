// import { updateUserRole } from "../api";
import { useAppSelector } from "../app/hooks";
// import { useAuth } from "../context/useContext";
import { selectUser } from "../features/auth/authSlice";
import { useUpdateUserRoleMutation } from "../features/users/usersApi";

export function useRoleChange() {
  const user = useAppSelector(selectUser);
  const [updateUserRole, { isLoading }] = useUpdateUserRoleMutation();

  const handleRoleChange = async (targetUserId: string, newRole: string) => {
    if (!user) return;

    if (user.role !== "admin") return;

    if (user.id === targetUserId) return;

    try {
      await updateUserRole({ id: targetUserId, role: newRole }).unwrap();
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  return { handleRoleChange, isLoading };
}
