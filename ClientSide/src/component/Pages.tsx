import React, { useEffect } from 'react';
import OpenLayersMap, { Marker } from './Map';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { DisplayEnum } from '../Types/Display';
import Grafs from './Grafs';
import { returnGrafOrMap } from '../Utils/SetOption';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import { fetchHighNkillCases } from '../redux/extraReduser/Cases';
import { extraReducerBySelect } from '../Utils/ExtraReduserBySelect';
import SelectCantry from './SelectCantry';

interface Props {
  display: DisplayEnum;
  setDisplay: React.Dispatch<React.SetStateAction<DisplayEnum>>;
  selected: string | null;
}
export default function Pages({ display, setDisplay, selected }: Props) {
  const markers = useSelector((state: RootState) => state.Map.markers);
  const datas = useSelector((state: RootState) => state.Graf.Graf);


  useEffect(() => {
    returnGrafOrMap(setDisplay, selected!);
  }, [selected]);

  return (
    <>
      {display === DisplayEnum.ABOUT && <Home />}
      {display === DisplayEnum.MAPS && <OpenLayersMap markers={markers as Marker[]} selected={selected!}/>}
      {display === DisplayEnum.GRAFS && <Grafs selected={selected!} datas={datas} />}
    </>
  );

}
