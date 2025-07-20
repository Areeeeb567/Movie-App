import React from 'react';
import {Box} from '@mui/material';
import Header from '../components/organisms/header/header';
import Navbar from '../components/navbar/navbar';

type PageProps = {
    children?: React.ReactNode;
};

const Page: React.FC<PageProps> = ({ children }) => {
    return (
        <>
            <Header />
            <Navbar />
            <Box
                component="main"
                sx={{
                    width: '100%',
                    boxSizing: 'border-box',
                    overflowX: 'auto',
                    overflowY: 'auto',
                    position: 'relative',
                    color: 'white',
                    paddingLeft: 12,
                    paddingTop: 3,
                }}
            >
                {children}
            </Box>
        </>
    );
};


export default Page;
