import { useAppSelector } from '../../hooks/useFlux'
// import { setLoginText } from '../../redux/reducers/UsersReducer';

export default function LoginText() {
  const loginText = useAppSelector(state => state.users.loginText);
  // const dispatch = useAppDispatch();
  // setTimeout(() => {
  //   dispatch(setLoginText(''));
  // }, 3000);
  return (
    <>
    {loginText && <p style={{color:'lightcoral'}} ><strong>{loginText}</strong></p>}
    </>
  )
}
