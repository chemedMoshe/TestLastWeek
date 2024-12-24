import { useEffect, useState } from 'react';
import Pages from './component/Pages';
import { DisplayEnum } from './Types/Display';
import ResponsiveAppBar from './component/responsive';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './component/Home';

export default function App() {
  const [display, setDisplay] = useState<DisplayEnum>(DisplayEnum.MAPS);
  const [selected, setSelected] = useState<string|null>("Select");
const navigte = useNavigate();
useEffect(() => {
  if(selected !== "Select"){
 navigte('/pages');
 return 
  }
  navigte('/');
},[selected])
  return (
    <div className='app'>
      <ResponsiveAppBar setDisplay={setDisplay} setSelected={setSelected} />
      
        <Routes>
          <Route index element={<Home />} />
          <Route path='pages' element={ <Pages display={display} setDisplay={setDisplay} selected={selected} />} />
        </Routes>
    </div>
  );
}
