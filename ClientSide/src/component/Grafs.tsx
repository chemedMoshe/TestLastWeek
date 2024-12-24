import Filtering from './filtering';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RootState, useAppDispatch } from '../redux/store';
import { fetchCasesByYears, fetchHighNkillCases } from '../redux/extraReduser/Cases';
import { useSelector } from 'react-redux';
import { returnToolsfotGraf, TypereturnTools } from '../Utils/returnToolsfotGraf';
import ReturnCompBySelected from './returnCompBySelected';
import Home from './Home';
import { fetchGnameByYear } from '../redux/extraReduser/organisation';
interface Props {
  selected: string;
}

export default function Grafs({ selected }: Props) {
  const dataKey: TypereturnTools = returnToolsfotGraf(selected)!;
  const appDispatch = useAppDispatch();
  const [options, setOptions] = useState<string[] | null[]>([null]);
  const [fromYear, setFromYear] = useState<number>();
  const [toYear, setToYear] = useState<number>();
  const [yearForGname, setYearForGname] = useState<number>();
  const [org,setOrg] = useState<string>("")
  useEffect(() => {

    selected === "Option 1" && appDispatch(fetchHighNkillCases(options));
    selected === "Option 3" && fromYear && appDispatch(fetchCasesByYears({fromYear, toYear}));
    selected === "Option 5" && yearForGname && appDispatch(fetchGnameByYear({year:yearForGname,org}));
  }, [options, fromYear, toYear, yearForGname,org]);


  const datas = useSelector((state: RootState) => state.Graf.Graf);

  return (
    <div className='grafs'>
      <div>
        <ReturnCompBySelected selected={selected}org={org} setOrg={setOrg} yearForGname={yearForGname!} comp={<Home />} options={options} setOptions={setOptions} setFromYear={setFromYear} setToYear={setToYear} fromYear={fromYear} toYear={toYear}  setYearForGname={setYearForGname}/>
      </div>
      <div className='displayGraf'>
        <ResponsiveContainer width="100%" height="60%">
          <BarChart
            width={7}
            height={7}
            data={datas!}

          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis angle={12} dataKey={dataKey?.XAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={dataKey?.Bar} fill="blue" activeBar={<Rectangle fill="red" stroke="black" />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
