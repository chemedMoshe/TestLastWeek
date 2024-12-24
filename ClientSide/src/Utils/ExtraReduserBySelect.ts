import { fetchHighNkillCases, fetchMarkers } from "../redux/extraReduser/Cases";

export const extraReducerBySelect = (select: string) => {

    return select === "Option 1" ? fetchHighNkillCases :
        select === "Option 2" ? fetchMarkers :
            select === "Option 3" ? fetchHighNkillCases :
                select === "Option 4" ? fetchHighNkillCases :
                    fetchHighNkillCases;
};