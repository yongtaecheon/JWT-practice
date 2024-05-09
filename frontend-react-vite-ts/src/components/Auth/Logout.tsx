import React from 'react'
import { useLogout } from '../../hooks/useLogout';

export default function Logout() {
  const logOut = useLogout();
  return (
    <>
      <button onClick={logOut}>로그아웃</button>
    </>
  )
}
