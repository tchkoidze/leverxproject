// type EMployee = {
//   _id: string;
//   isRemoteWork: boolean;
//   user_avatar: string;
//   first_name: string;
//   last_name: string;
//   first_native_name: string;
//   last_native_name: string;
//   middle_native_name: string;
//   department: string;
//   building: string;
//   room: string;
//   date_birth: {
//     year: number;
//     month: number;
//     day: number;
//   };
//   desk_number: number;
//   manager: {
//     id: string;
//     first_name: string;
//     last_name: string;
//   };
//   phone: string;
//   email: string;
//   telegram: string;
//   cnumber: string;
//   citizenship: string;
//   visa: {
//     issuing_country: string;
//     type: string;
//     start_date: number;
//     end_date: number;
//   }[];
// };

export interface DateOfBirth {
  year: number;
  month: number;
  day: number;
}

export interface Manager {
  id: string;
  first_name: string;
  last_name: string;
}

export interface Visa {
  issuing_country: string;
  type: string;
  start_date: number;
  end_date: number;
}

export interface Employee {
  _id: string;
  isRemoteWork: boolean;
  user_avatar: string;
  first_name: string;
  last_name: string;
  first_native_name: string;
  last_native_name: string;
  middle_native_name: string;
  department: string;
  building: string;
  room: string;
  date_birth: DateOfBirth;
  desk_number: number;
  manager: Manager;
  phone: string;
  email: string;
  telegram: string;
  cnumber: string;
  citizenship: string;
  visa: Visa[];
  role: string;
}

export type InfoItemProps = {
  icon: string;
  label: string;
  value: string;
};

export type showMobileMenuProps = {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface AuthenticatedUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_avatar: string;
  role: string;
}
export interface UserProfile {
  first_name: string;
  last_name: string;
  user_avatar: string;
  role: string;
}

export type AuthContextType = {
  user: AuthenticatedUser | null;
  login: (userCredenrials: AuthenticatedUser, remember: boolean) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
};

export interface OutletContextType {
  refreshKey: number;
  triggerRefresh: () => void;
}

export interface UsersQueryParams {
  name?: string;
  email?: string;
  phone?: string;
  telegram?: string;
  building?: string;
  room?: string;
  department?: string;
}

export type BasicSearchProps = {
  onSearch: (name: string) => void;
};

export type AdvancedSearchProps = {
  onSearch: (values: UsersQueryParams) => void;
};

export interface UpdateUserPayload {
  first_name: string;
  last_name: string;
  first_native_name: string;
  last_native_name: string;
  middle_native_name: string;
  department: string;
  building: string;
  room: string;
  date_birth: { year: number | null; month: number | null; day: number | null };
  desk_number: number;
  manager: {
    first_name: string;
    last_name: string;
  };
  phone: string;
  email: string;
  telegram: string;
  cnumber: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
