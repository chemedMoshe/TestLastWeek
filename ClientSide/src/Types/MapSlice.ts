import { Marker } from "../component/Map";

export interface MapState {
    loading: boolean,
    error: boolean,
    success: boolean,
    markers: Marker[],
}
