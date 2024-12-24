import { useRef, useEffect, useState } from 'react';
import 'ol/ol.css';
import { Map, View, Overlay } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon } from 'ol/style';
import { RootState, useAppDispatch } from '../redux/store';
import { fetchBoldGname,  fetchMarkers } from '../redux/extraReduser/Cases';
import CircularIndeterminate from './SpinerComponent';
import { useDispatch, useSelector } from 'react-redux';
import SelectCantry from './SelectCantry';
import { addData } from '../redux/slice/GrafSlice';
import { fetchGetbyStorGname } from '../redux/extraReduser/organisation';
import SelectGname from './SelectGname';

export interface Marker {
  location: [number, number];
  info: string;
}

export interface MapComponentProps {
  markers: Marker[];
  selected: string | null;
}

export default function OpenLayersMap({ markers, selected }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const vectorSource = useRef<VectorSource>(new VectorSource());
  const [selectCantry, setSelectCantry] = useState<string|null>(null);
  const [locationMap, setLocationMap] = useState<[number, number]>([35.2137, 31.7683]);
  const [amount, setAmount] = useState<number|undefined>();
  const[org,setOrg] = useState<string>("")
  const appdispatch = useAppDispatch();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.Map.loading);
  const success = useSelector((state: RootState) => state.Map.success);
  useEffect(() => {
    if (selected === 'Option 2') {
      appdispatch(fetchMarkers(selectCantry));
    }
    if(selected === "Option 4"){
      selectCantry && appdispatch(fetchBoldGname({cantry:selectCantry,amount}));
    }
    if(selected === "Option 6"){
      org && appdispatch(fetchGetbyStorGname(org));
    }
  }, [selected,selectCantry,amount,org]);
  
  useEffect(() => {
    if (success) {
      dispatch(addData(markers));
    }
  }, [success]);
  useEffect(() => {
    if (map && markers.length >= 1) {
      const newLocation = markers[0].location;
      setLocationMap(newLocation);
  
      const view = map.getView();
      view.animate({
        center: fromLonLat(newLocation),
        duration: 1000,
        zoom: 5,
      });
    }
  }, [markers, map]);
  useEffect(() => {
    if (map) {
      return
    }
    const initialMap = new Map({
      target: mapRef.current!,
      layers: [
        new TileLayer({ source: new OSM() }),
        new VectorLayer({ source: vectorSource.current }),
      ],
      view: new View({
        center: fromLonLat(locationMap),
        zoom: 5,
      }),
    });

    initialMap.on('click', (event) => {
      const feature = initialMap.forEachFeatureAtPixel(event.pixel, (feat) => feat);

      if (feature) {
        //@ts-ignore
        const coordinate = feature.getGeometry()?.getCoordinates();
        const info = feature.get('info');

        if (info && coordinate) {
          const overlay = new Overlay({
            element: popupRef.current!,
            positioning: 'bottom-center',
            stopEvent: false,
            offset: [0, -10],
          });

          if (!initialMap.getOverlays().getArray().includes(overlay)) {
            initialMap.addOverlay(overlay);
          }

          overlay.setPosition(coordinate);
          popupRef.current!.style.display = 'block';
          popupRef.current!.innerHTML = `<p>${info}</p>`;
        }
      } else {
        if (popupRef.current) {
          popupRef.current.style.display = 'none';
        }
      }
    });

    setMap(initialMap);
  }, []);

  useEffect(() => {
    vectorSource.current.clear();
    markers.forEach((marker) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(marker.location)),
        info: marker.info,
      });

      feature.setStyle(
        new Style({
          image: new Icon({
            src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
            scale: 0.05,
            anchor: [0.5, 1],
          }),
        })
      );

      vectorSource.current.addFeature(feature);
    });
  }, [markers]);

  return (
    
    <div className="map-container">
     {selected === "Option 2" || selected === "Option 4" && <SelectCantry setSelectCantry={setSelectCantry} setLocationMap={setLocationMap} setAmount={setAmount} selected={selected} amount={amount!}/>
}
{selected === "Option 6" && <SelectGname org={org} setOrg={setOrg}/>}
      <div className='Map'
        ref={mapRef} />
      <div
        ref={popupRef}
        style={{
          display: 'none',
          backgroundColor: 'white',
          border: '1px solid black',
          padding: '5px',
          borderRadius: '5px',
          position: 'absolute',
          zIndex: 10000,
          pointerEvents: 'none',
        }}
      />
     {loading &&  <div className="spiner">
        <CircularIndeterminate />
      </div>}
     
    </div>
  );
}
