import { TextField, Button, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLoginMutation } from '../apis/auth.api';
import { useAppDispatch } from '../app/hooks';
import { setAuthState } from '../slices/auth.slice';
import { User } from '../models/User';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [login] = useLoginMutation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogin = async () => {
    !email ? setEmailError(true) : setEmailError(false);
    !password ? setPasswordError(true) : setPasswordError(false);
    try {
      const response = (await login({ email, password })) as { data: User };
      dispatch(setAuthState({ user: response.data }));
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen gap-8">
      <h1 className="text-6xl">Crypto Stats</h1>

      <div className="flex flex-col gap-2">
        <TextField
          label="email"
          className="w-80"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          helperText={emailError && 'Please enter a valid email'}
          error={emailError}
        />
        <TextField
          label="password"
          type="password"
          className="w-80"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          helperText={passwordError && 'Password may not be empty'}
          error={emailError}
        />

        <Link to="/signup" className="justify-self-start self-start mt-2">
          <MuiLink>Don't have an account?</MuiLink>
        </Link>
      </div>

      <Button variant="contained" className="w-80" onClick={handleLogin}>
        <span className="p-1 ">Login</span>
      </Button>
    </div>
  );
};

export default LoginForm;
