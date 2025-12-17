import { useState } from "react";
import type { Employee } from "../types";
import { fromDateInputValue, toDateInputValue } from "../utils/date";
// import { updateEmployee } from "../api";
import { useUpdateUserMutation } from "../features/users/usersApi";
import { useDispatch } from "react-redux";
import { updateAuthUser } from "../features/auth/authSlice";

interface UseEditEmployeeProps {
  employee: Employee;
  setShowEditForm: (v: boolean) => void;
}

export function useEditEmployee({
  employee,
  setShowEditForm,
}: UseEditEmployeeProps) {
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    first_name: employee.first_name || "",
    last_name: employee.last_name || "",
    first_native_name: employee.first_native_name || "",
    last_native_name: employee.last_native_name || "",
    middle_native_name: employee.middle_native_name || "",
    department: employee.department || "",
    building: employee.building || "",
    room: employee.room || "",
    date_birth: toDateInputValue(employee.date_birth),
    // desk_number: employee.desk_number || "",
    desk_number:
      employee.desk_number != null ? employee.desk_number.toString() : "",
    manager_first: employee.manager.first_name || "",
    manager_last: employee.manager.last_name || "",
    phone: employee.phone || "",
    email: employee.email || "",
    telegram: employee.telegram || "",
    cnumber: employee.cnumber || "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const employeePayload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      first_native_name: formData.first_native_name,
      last_native_name: formData.last_native_name,
      middle_native_name: formData.middle_native_name,
      department: formData.department,
      building: formData.building,
      room: formData.room,
      date_birth: fromDateInputValue(formData.date_birth),
      desk_number: Number(formData.desk_number),
      manager: {
        first_name: formData.manager_first,
        last_name: formData.manager_last,
      },
      phone: formData.phone,
      email: formData.email,
      telegram: formData.telegram,
      cnumber: formData.cnumber,
    };

    try {
      const user = await updateUser({
        id: employee._id,
        updates: employeePayload,
      }).unwrap();
      console.log("updated user : ", user.user);
      dispatch(
        updateAuthUser({
          email: user.user.email,
          first_name: user.user.first_name,
          last_name: user.user.last_name,
          user_avatar: user.user.user_avatar,
        })
      );
      setShowEditForm(false);
    } catch (err) {
      console.error("Failed to update user", err);
    }
  }

  return { formData, handleChange, handleSubmit, loading: isLoading, error };
}
