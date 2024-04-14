import React, { useState } from 'react';

// ! now when we added global.d.ts typescript can see the files
import * as classes from '../components/App.module.scss';
import { Link, Outlet } from 'react-router-dom';

import cubesImgPng from '../assets/cubes.png';
import pandaImgJpg from '../assets/panda.jpg';
import CloudSvg from '../assets/cloud.svg';

const ADD = () => {
  ADD2();
};

const ADD2 = () => {
  throw new Error();
};

const App = () => {
  console.log(classes);
  const [count, setCount] = useState<number>(0);

  // if (__PLATFORM__ === 'desktop') {
  //   return <>ISDESKTOPAPP</>;
  // }

  // if (__PLATFORM__ === 'mobile') {
  //   return <>ISMOBILEAPP</>;
  // }

  if (__ENV__ === 'development') {
    console.log('development mode');
  }

  // ! now with transpileOnly: true - we still can compile ts our code without an error (when there actually is one)
  // !! now with another plugin we actually speed up the project building but we will see the ts errors
  // console.log(ADD(8, '9'));

  // if (__ENV__ === 'production') {
  //   console.log('productionmode');
  // }

  return (
    <div data-testid="App.DataTestId">
      <p data-testid="Platform">Platfom {__PLATFORM__}</p>
      <>
        <img src={cubesImgPng} alt="" width={250} height={200} />
        <img src={pandaImgJpg} alt="" width={250} height={200} />
      </>
      <>
        {/* 
            color="blueviolet" - we can apply inline color style, changed svgr loader config makes it possible
        */}
        <CloudSvg width={60} height={50} color="blue" />
      </>
      <Link to="/about">About</Link>
      <Link to="/shop">Shop</Link>
      <button className={classes.button} onClick={ADD}>
        Increase
      </button>
      <p className={classes.value}>{count}</p>
      <button className={classes.button} onClick={() => setCount((prev) => prev - 1)}>
        Decrease
      </button>
      <Outlet />
    </div>
  );
};

export default App;
