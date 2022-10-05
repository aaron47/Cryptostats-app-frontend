import { TextField, Button, Link as MuiLink } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../apis/auth.api';
import { useCreateUserMutation } from '../apis/users.api';
import { useAppDispatch } from '../app/hooks';
import { User } from '../models/User';
import { setAuthState } from '../slices/auth.slice';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [createUser] = useCreateUserMutation();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignUp = async () => {
    !email ? setEmailError(true) : setEmailError(false);
    !password ? setPasswordError(true) : setPasswordError(false);

    try {
      await createUser({ email, password });
      const response = (await login({ email, password })) as { data: User };
      dispatch(setAuthState({ user: response.data }));
      navigate('/');
    } catch (e) {
      console.error(e);
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
        <Link to="/login" className="justify-self-start self-start mt-2">
          <MuiLink>Already have an account?</MuiLink>
        </Link>
      </div>

      <Button onClick={handleSignUp} variant="contained" className="w-80">
        <span className="p-1 ">Sign Up</span>
      </Button>
    </div>
  );
};

export default SignUpForm;
