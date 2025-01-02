import {memo, useCallback, useState} from 'react';
import {Box, Button, FormHelperText, Typography} from '@mui/material';
import * as Yup from 'yup';

import useAuth from 'src/hooks/useAuth';
import {InferType} from 'yup';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {TextFieldElement} from 'react-hook-form-mui';

const v8nSchema = Yup.object().shape({
  username: Yup.string().required('required'),
  password: Yup.string().required('required'),
});

type FormValues = InferType<typeof v8nSchema>;

const Login = () => {
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
  const { control, handleSubmit, formState: {isSubmitting} } = form;

  const onSubmit = useCallback(
    async ({username, password}: FormValues) => {
      try {
        await login(username, password);
      } catch (e) {
        setAuthError((e as Error).message);
      }
    },
    [login],
  );

  return (
    <FormProvider {...form} >
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
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="h4" color="textPrimary">
              Welcome to the test
            </Typography>

            <TextFieldElement label="Username" name="username" control={control} />

            <TextFieldElement label="Password" name="password" type="password" control={control} />

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

            <Typography
              align="center"
              variant="subtitle2"
              color="textSecondary"
            >
              For login use &quot;eve.holt@reqres.in&quot; username with any
              password
            </Typography>
          </Box>
        </Box>
    </FormProvider>
  );
};

export default memo(Login);
