import { ERole } from "@/utils/constants/role.enum";
import React from "react";

interface Props {
  role?: ERole;
}

const Role: React.FC<Props> = ({ role = ERole.USER }) => {
  const roleStyles = {
    [ERole.ADMIN]: "custom-badge admin-badge",
    [ERole.USER]: "custom-badge user-badge",
  };

  return (
    <span
      className={roleStyles[role] || "custom-badge default-badge"}
      data-hover-text={role}
      style={{ lineHeight: "unset" }}
    >
      {role.toUpperCase()[0]}
    </span>
  );
};

export default Role;
