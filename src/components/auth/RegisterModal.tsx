import { useDispatch } from 'react-redux';

import DialogTitle from '@mui/material/DialogTitle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Dialog from '@mui/material/Dialog';

import { AppDispatch, fetchRegister } from '../../redux';

import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthModalProps, UserSubmitRegisterForm, UserProps } from './types';
import { registerValidationSchema } from '../../settings/validations';

export const RegisterModal: React.FC<AuthModalProps> = (props) => {
  const { onClose, open, ...other } = props;
  const emailErrorMassage = 'Email is already exist!';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitRegisterForm>({
    resolver: yupResolver(registerValidationSchema),
  });
  const dispatch = useDispatch() as AppDispatch;

  const onSubmit = async (values: FieldValues) => {
    if (values) {
      const { name, email, password } = values as UserProps;
      const userData = {
        name,
        email,
        password,
      };
      console.log(userData);
      const data = await dispatch(fetchRegister(userData));

      if (!data.payload) {
        alert(emailErrorMassage);
        return;
      }
      if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      }
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
            <label htmlFor="name" className="game-register__input-label">
              User Name
            </label>
            <input
              id="name"
              className="game-register__input"
              placeholder="User name..."
              type="name"
              {...register('name')}
            />

            {errors?.name && (
              <p className="form-errors">{errors.name.message}</p>
            )}
          </div>
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
          <div className="game-register__input-box">
            <label
              htmlFor="confirmpassword"
              className="game-register__input-label"
            >
              Confirm Password
            </label>

            <input
              id="confirmpassword"
              type="password"
              className="game-register__input"
              placeholder="Confirm password"
              {...register('confirmPassword')}
            />
            {errors?.confirmPassword && (
              <p className="form-errors">{errors.confirmPassword.message}</p>
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
