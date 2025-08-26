import { Request, Response } from 'express';
import { addCandidate, findCandidateById, updateCandidateStage } from '../../application/services/candidateService';

export const addCandidateController = async (req: Request, res: Response) => {
    try {
        const candidateData = req.body;
        const candidate = await addCandidate(candidateData);
        res.status(201).json({ message: 'Candidate added successfully', data: candidate });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error adding candidate', error: error.message });
        } else {
            res.status(400).json({ message: 'Error adding candidate', error: 'Unknown error' });
        }
    }
};

export const getCandidateById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const candidate = await findCandidateById(id);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.json(candidate);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateCandidateStageController = async (req: Request, res: Response) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request params:', req.params);
        
        const id = parseInt(req.params.id);
        const { new_interview_step, applicationId } = req.body;
        
        console.log('Parsed ID:', id);
        console.log('new_interview_step:', new_interview_step);
        console.log('applicationId:', applicationId);
        
        if (!new_interview_step) {
            return res.status(400).json({ error: 'new_interview_step is required' });
        }
        
        const applicationIdNumber = parseInt(applicationId);
        if (isNaN(applicationIdNumber)) {
            return res.status(400).json({ error: 'Invalid applicationId format' });
        }
        
        const currentInterviewStepNumber = parseInt(new_interview_step);
        if (isNaN(currentInterviewStepNumber)) {
            return res.status(400).json({ error: 'Invalid new_interview_step format' });
        }
        
        console.log('Calling updateCandidateStage with:', { id, applicationIdNumber, currentInterviewStepNumber });
        
        const updatedCandidate = await updateCandidateStage(id, applicationIdNumber, currentInterviewStepNumber);
        console.log('Updated candidate:', updatedCandidate);
        
        res.status(200).json({ message: 'Candidate stage updated successfully', data: updatedCandidate });
    } catch (error: unknown) {
        console.error('Error in updateCandidateStageController:', error);
        if (error instanceof Error) {
            if (error.message === 'Error: Application not found') {
                res.status(404).json({ message: 'Application not found', error: error.message });
            } else {
                res.status(400).json({ message: 'Error updating candidate stage', error: error.message });
            }
        } else {
            res.status(500).json({ message: 'Error updating candidate stage', error: 'Unknown error' });
        }
    }
};
export { addCandidate };
