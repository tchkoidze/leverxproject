import type { Employee } from "../types";
import { useEditEmployee } from "../hooks/useEditEmployee";

export default function EditEmployeeInfo({
  setShowEditForm,
  employee,
}: {
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  employee: Employee;
}) {
  const { formData, handleChange, handleSubmit, loading, error } =
    useEditEmployee({
      employee,
      setShowEditForm,
    });

  return (
    <form
      onSubmit={handleSubmit}
      className="edit-form-component"
      id="edit-form"
    >
      {/* <!-- edit form --> */}
      <div className="input-block">
        <div className="input-box">
          <label htmlFor="edit-firstName">First Name</label>
          <input
            type="text"
            id="edit-firstName"
            name="first_name"
            placeholder="firstName"
            className="advanced-input"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <label htmlFor="edit-lastName">Last Name</label>
          <input
            type="text"
            id="edit-lastName"
            name="last_name"
            placeholder="lastName"
            className="advanced-input"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-block">
        <div className="input-box">
          <label htmlFor="edit-nativeFirstName">Native First Name</label>
          <input
            type="text"
            id="edit-nativeFirstName"
            name="first_native_name"
            placeholder="Native First Name"
            className="advanced-input"
            value={formData.first_native_name}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <label htmlFor="edit-nativeLaststName">Native Lastst Name</label>
          <input
            type="text"
            id="edit-nativeLaststName"
            name="last_native_name"
            placeholder="Native last Name"
            className="advanced-input"
            value={formData.last_native_name}
            onChange={handleChange}
          />
        </div>

        {/* <!-- <input
                type="text"
                id="edit-nativeMiddleName"
                name="edit-nativeMiddleName"
                placeholder="Native Middle Name"
                className="advanced-input"
              /> --> */}
      </div>

      <div
        className="input-block"
        //className="middle-name-date"
      >
        <div className="input-box">
          <label htmlFor="edit-nativeMiddleName">Middle Name</label>
          <input
            type="text"
            id="edit-nativeMiddleName"
            name="middle_native_name"
            placeholder="Native Middle Name"
            className="advanced-input"
            value={formData.middle_native_name}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <label htmlFor="edit-birthDate">Birth Date</label>
          <input
            type="date"
            id="edit-birthDate"
            name="date_birth"
            placeholder="Desk Number"
            className="advanced-input"
            value={formData.date_birth}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-block">
        <div className="input-box">
          <label htmlFor="edit-department">Department</label>
          <input
            type="text"
            id="edit-department"
            name="department"
            placeholder="Department"
            className="advanced-input"
            value={formData.department}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <label htmlFor="edit-building">Building</label>
          <input
            type="text"
            id="edit-building"
            name="building"
            placeholder="Building"
            className="advanced-input"
            value={formData.building}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-block">
        <div className="input-box">
          <label htmlFor="edit-room">Room</label>
          <input
            type="text"
            id="edit-room"
            name="room"
            placeholder="Room"
            className="advanced-input"
            value={formData.room}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <label htmlFor="edit-deskNum">Desk Number</label>
          <input
            type="number"
            id="edit-deskNum"
            name="desk_number"
            placeholder="Desk Number"
            className="advanced-input"
            value={formData.desk_number}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-block">
        <div className="input-box">
          <label htmlFor="manager-firstName">Manager Name</label>
          <input
            type="text"
            id="manager-firstName"
            name="manager_first"
            placeholder="Manager Name"
            className="advanced-input"
            value={formData.manager_first}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <label htmlFor="manager-lastName">Manager Last Name</label>
          <input
            type="text"
            id="manager-lastName"
            name="manager_last"
            placeholder="Manager Last Name"
            className="advanced-input"
            value={formData.manager_last}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-block">
        <div className="input-box">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            name="phone"
            placeholder="Mobile"
            className="advanced-input"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <label htmlFor="edit-email">Email</label>
          <input
            type="email"
            id="edit-email"
            name="email"
            placeholder="Email"
            className="advanced-input"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-block">
        <div className="input-box">
          <label htmlFor="telegram">Telegram</label>
          <input
            type="text"
            id="telegram"
            name="telegram"
            placeholder="Telegram"
            className="advanced-input"
            value={formData.telegram}
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <label htmlFor="cnumber">C-number</label>
          <input
            type="text"
            id="cnumber"
            name="cnumber"
            placeholder="C-number"
            className="advanced-input"
            value={formData.cnumber}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-block">
        <button type="submit" className="sebmit-edit-btn">
          Submit
        </button>
        <button
          onClick={() => setShowEditForm(false)}
          type="button"
          className="cansel-edit-btn"
        >
          cancel
        </button>
      </div>
    </form>
  );
}
