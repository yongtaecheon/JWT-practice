import profile from '../../assets/pepe.png';
import { useAppSelector } from '../../hooks/useFlux';

export default function UserInfo() {
  const userInfo = useAppSelector(state => state.users.userInfo);
  return (
    <>
      <h1>{userInfo.username}</h1>
      <img style={{width:'300px', display:'block', marginBottom:'20px'}} src={profile}></img>
    </>
  )
}
