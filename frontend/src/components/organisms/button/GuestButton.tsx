import { Button } from '@mui/material';
import type {MouseEventHandler} from 'react';

interface GuestButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const GuestButton = ({ onClick }: GuestButtonProps) => {
    return (
        <Button
            variant="outlined"
            fullWidth
            onClick={onClick}
            sx={(theme) => ({
                mt: 1,
                color: theme.palette.text.primary,
                borderColor: theme.palette.secondary.light,
                backgroundColor: theme.palette.secondary.light + '20',
                '&:hover': {
                    backgroundColor: theme.palette.secondary.light + '30',
                },
            })}
        >
            Continue as Guest
        </Button>
    );
};

export default GuestButton;
