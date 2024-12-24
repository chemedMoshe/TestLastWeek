import CasesType from "./CasesTrype";

export interface CaseSlice {
    Graf: CasesType[] | null;
    loading: boolean;
    error: string;
    success: boolean;
}

export type ExtraMarker = {
    info: string,
    sum: number,
    location: [number, number];
};
