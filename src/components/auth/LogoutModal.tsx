import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

import { LogoutModalProps } from './types';

export const LogoutModal: React.FC<LogoutModalProps> = (props) => {
  const { onClose, open, action, ...other } = props;

  const handleCancel = () => {
    onClose();
  };
  const handleOk = () => {
    action();
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
        <p>Are you sure you want to logout?</p>
      </DialogTitle>
      <DialogActions>
        <button className="game__button" onClick={handleCancel}>
          Cancel
        </button>
        <button className="game__button" onClick={handleOk}>
          Ok
        </button>
      </DialogActions>
    </Dialog>
  );
};
