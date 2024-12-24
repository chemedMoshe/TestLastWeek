import exp from 'express'
import { getCases, getMarker } from '../Controller/CaseController';
import { byYear } from '../Controller/YearController';
import { getGnameByYears } from '../Controller/OrganisationController';

const router = exp.Router()


router.post('/deadliest-attack-types/',getCases)
router.get("/incident-trends/:startyear/:endyear",byYear)
router.get("/highest-casualty-regions/:cantry",getMarker)
export default router