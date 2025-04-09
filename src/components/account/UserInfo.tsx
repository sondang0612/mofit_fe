"use client";
import { useProfile } from "@/hooks/react-query/auth/useProfile";
import React from "react";

const UserInfo = () => {
  const { data: profile } = useProfile();
  return (
    <div className="account-user_info">
      <span className="account-user_info-title">Tài khoản của</span>
      <span className="account-user_info-name">
        {profile ? `${profile?.lastName} ${profile?.firstName}` : "Người dùng"}
      </span>
    </div>
  );
};

export default UserInfo;
