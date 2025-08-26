

import { Router } from 'express';
import { getCandidatesByPosition, getInterviewFlowByPosition, getAllPositions } from '../presentation/controllers/positionController';

const router = Router();

router.get('/', getAllPositions);
router.get('/:id/candidates', getCandidatesByPosition);
router.get('/:id/interviewflow', getInterviewFlowByPosition);

export default router;
