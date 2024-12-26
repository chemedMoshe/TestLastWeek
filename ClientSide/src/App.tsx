import { useEffect, useState } from 'react';
import Pages from './component/Pages';
import { DisplayEnum } from './Types/Display';
import ResponsiveAppBar from './component/responsive';
import {  Route, Routes, useNavigate } from 'react-router-dom';
import Home from './component/Home';
import CradComponent from './component/CradComponent';

export default function App() {
  const [display, setDisplay] = useState<DisplayEnum>(DisplayEnum.MAPS);
  const [selected, setSelected] = useState<string|null>("Select");
const navigte = useNavigate();
useEffect(() => {
  if(selected === "CRAD"){
     navigte('/crad');
     return 
  }
  if(selected !== "Select"){
 navigte('/pages');
 return 
  }
  navigte('/');
},[selected])
  return (
    <div className='app'>
      <div className='navBar'>
      <ResponsiveAppBar setDisplay={setDisplay} setSelected={setSelected} selected={selected!}/>
      </div>
        <Routes>
          <Route index element={<Home   setSelected={setSelected}/>} />
          <Route path='pages' element={ <Pages display={display} setDisplay={setDisplay} selected={selected} />} />
          <Route path='crad' element={ <CradComponent />} />
        </Routes>
    </div>
  );
}
