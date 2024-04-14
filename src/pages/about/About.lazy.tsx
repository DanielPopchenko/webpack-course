import React, { lazy } from 'react';

// ! Creating lazy component
const AboutLazy = lazy(() => import('./About'));

export default AboutLazy;
