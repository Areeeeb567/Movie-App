// src/components/LoadMoreButton.tsx
import React from 'react';
import { Button } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

interface LoadMoreButtonProps {
    direction: 'down' | 'right';
    onClick: () => void;
    disabled?: boolean;
    sx?: object;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
   direction,
   onClick,
   disabled = false,
   sx = {},
}) => {
    const Icon =
        direction === 'down'
            ? KeyboardArrowDownOutlinedIcon
            : KeyboardArrowRightOutlinedIcon;

    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            variant="contained"
            sx={{
                width: 48,
                height: 48,
                minWidth: 'auto',
                borderRadius: '50%',
                backgroundColor: 'secondary.light',
                opacity: 0.85,
                '&:hover': {
                    backgroundColor: 'primary.dark',
                    opacity: 1,
                },
                ...sx,
            }}
        >
            <Icon />
        </Button>
    );
};

export default LoadMoreButton;
