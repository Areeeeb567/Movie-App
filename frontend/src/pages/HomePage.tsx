// src/pages/HomePage.tsx

import React from 'react';
import Page from '../templates/page';
import MovieRow from '../components/organisms/movieRow/MovieRow';
import { getTrending, getPopular, getTopRated, getNowPlaying } from '../services/movie';

const HomePage: React.FC = () => {
    return (
        <Page>
            <MovieRow title="Trending Now" fetchFunction={getTrending} />
            <MovieRow title="Top Rated" fetchFunction={getTopRated} />
            <MovieRow title="Popular Movies" fetchFunction={getPopular} />
            <MovieRow title="Now Playing" fetchFunction={getNowPlaying} />
        </Page>
    );
};

export default HomePage;
