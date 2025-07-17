import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/navbar/navbar';
import Header from '../components/organisms/header/header';

type PageProps = {
    children?: React.ReactNode;
};

const Page: React.FC<PageProps> = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Header />
            <Navbar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    minHeight: '100vh',
                    color: 'white',
                }}
            >
                <Navbar />
                {children}
            </Box>
        </Box>
    );
};

export default Page;
