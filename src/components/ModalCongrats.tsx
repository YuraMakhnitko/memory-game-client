import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';

export interface ResultModalProps {
  keepMounted: boolean;
  open: boolean;
  onClose: (value?: string) => void;
  onLevelUp: () => void;
  onRestart: () => void;
}

export const ResultModalWindow: React.FC<ResultModalProps> = (props) => {
  const { onClose, open, onLevelUp, onRestart, ...other } = props;
  const { isFailed, score, finalScore } = useSelector(
    (state: RootState) => state.game
  );

  const greetingMessage = (
    <p id="game-main-text">
      Congratulations <br /> good job! <br /> You passed the level <br />
      <br /> total: <span>{score}</span> points!
    </p>
  );
  const failMassage = (
    <p id="game-main-text">
      Game over <br /> Total points: <span>{finalScore}</span> <br /> <br />{' '}
      Don't worry, just try again!
    </p>
  );

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    !isFailed ? onLevelUp() : onRestart();
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
        {!isFailed ? greetingMessage : failMassage}
      </DialogTitle>
      {!isFailed && (
        <DialogTitle id="game-main-text">Go to the next level?</DialogTitle>
      )}

      <DialogActions>
        <button className="game__button" onClick={handleOk}>
          Ok
        </button>
      </DialogActions>
    </Dialog>
  );
};
