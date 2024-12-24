import exp from 'express';
import { getBoldOrganisation, getCasesByStrongGname, getGnameByYears } from '../Controller/OrganisationController';
import { gnameBold } from '../Controller/map';

const router = exp.Router()
router.get("/groups-by-year/",getGnameByYears)

router.get("/top-groups",getBoldOrganisation)

router.get("/deadliest-regions/",gnameBold as any )

export default router