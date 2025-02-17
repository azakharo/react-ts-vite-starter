import {memo, useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {TextFieldElement} from 'react-hook-form-mui';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Button, FormHelperText, Typography} from '@mui/material';
import * as Yup from 'yup';
import {InferType} from 'yup';

import {useAuth} from '@/features/auth';
import {ROUTE__MAIN} from '@/shared/constants';

const v8nSchema = Yup.object().shape({
  username: Yup.string().required('required'),
  password: Yup.string().required('required'),
});

type FormValues = InferType<typeof v8nSchema>;

const Login = () => {
  const [urlParams] = useSearchParams();
  const navigate = useNavigate();
  const {login} = useAuth();
  const [authError, setAuthError] = useState('');

  const form = useForm({
    mode: 'onBlur',
    resolver: yupResolver(v8nSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
  } = form;

  const onSubmit = useCallback(
    async ({username, password}: FormValues) => {
      try {
        await login(username, password);
      } catch (e) {
        setAuthError((e as Error).message);
        return;
      }

      const url = urlParams.get('redirect') ?? ROUTE__MAIN;

      navigate(url);
    },
    [login, navigate, urlParams],
  );

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
        component="form"
        noValidate
        onSubmit={event => {
          const returnedFunc = handleSubmit(onSubmit);

          void returnedFunc(event);
        }}
      >
        <Typography variant="h4" color="textPrimary">
          Welcome to the test
        </Typography>

        <TextFieldElement label="Username" name="username" control={control} />

        <TextFieldElement
          label="Password"
          name="password"
          type="password"
          control={control}
        />

        {authError && <FormHelperText error>{authError}</FormHelperText>}

        <Box pt={2}>
          <Button
            color="secondary"
            disabled={isSubmitting}
            size="large"
            type="submit"
            variant="contained"
          >
            Login
          </Button>
        </Box>

        <Typography align="center" variant="subtitle2" color="textSecondary">
          For login use &quot;eve.holt@reqres.in&quot; username with any
          password
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(Login);
