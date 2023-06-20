import { useDispatch } from 'react-redux';
import { AppDispatch, fetchLogin } from '../../redux';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthModalProps, UserSubmitLoginForm, UserProps } from './types';
import { loginValidationSchema } from '../../settings/validations';

export const LoginModal: React.FC<AuthModalProps> = (props) => {
  const emailErrorMassage = 'Invalid password or email!';
  const { onClose, open, ...other } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitLoginForm>({
    resolver: yupResolver(loginValidationSchema),
  });
  const dispatch = useDispatch() as AppDispatch;

  const onSubmit = async (values: FieldValues) => {
    const { email, password } = values as UserProps;
    const userData = { email, password };
    const data = await dispatch(fetchLogin(userData));
    if (!data.payload) {
      alert(emailErrorMassage);
      return;
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          width: '80%',
          maxHeight: 435,
          background:
            'radial-gradient(ellipse at bottom, rgba(58, 91, 131, 0.95) 0%, rgba(0, 0, 3, 0.95) 100%)',
        },
      }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle id="game-main-text">
        <form
          action="#"
          className="game-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="game-register__input-box">
            <label htmlFor="email" className="game-register__input-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="game-register__input"
              placeholder="Email..."
              {...register('email')}
            />
            {errors?.email && (
              <p className="form-errors">{errors.email.message}</p>
            )}
          </div>
          <div className="game-register__input-box">
            <label htmlFor="password" className="game-register__input-label">
              Password
            </label>

            <input
              id="password"
              type="password"
              className="game-register__input"
              placeholder="Password..."
              {...register('password')}
            />
            {errors?.password && (
              <p className="form-errors">{errors.password.message}</p>
            )}
          </div>
          <div className="game-auth__submit-box">
            <button type="submit" className="game__button" title={'Sumbmit'}>
              Submit
            </button>
          </div>
        </form>
        <button className="game__button-cancel" onClick={handleCancel}>
          <HighlightOffIcon sx={{ width: '25px', height: '25px' }} />
        </button>
      </DialogTitle>
    </Dialog>
  );
};
