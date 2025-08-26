import { Request, Response } from 'express';
import { getCandidatesByPositionService, getInterviewFlowByPositionService } from '../../application/services/positionService';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllPositions = async (req: Request, res: Response) => {
    try {
        console.log('=== getAllPositions called ===');
        console.log('Request path:', req.path);
        console.log('Request url:', req.url);
        console.log('Request baseUrl:', req.baseUrl);
        console.log('Request originalUrl:', req.originalUrl);
        
        const positions = await prisma.position.findMany();
        console.log('Found positions:', positions);
        console.log('Sending response with positions count:', positions.length);
        
        res.status(200).json(positions);
    } catch (error) {
        console.error('Error in getAllPositions:', error);
        res.status(500).json({ message: 'Error retrieving positions', error: String(error) });
    }
};

export const getCandidatesByPosition = async (req: Request, res: Response) => {
    try {
        const positionId = parseInt(req.params.id);
        const candidates = await getCandidatesByPositionService(positionId);
        res.status(200).json({ candidates });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error retrieving candidates', error: error.message });
        } else {
            res.status(500).json({ message: 'Error retrieving candidates', error: String(error) });
        }
    }
};

export const getInterviewFlowByPosition = async (req: Request, res: Response) => {
    try {
        const positionId = parseInt(req.params.id);
        const interviewFlow = await getInterviewFlowByPositionService(positionId);
        res.status(200).json({ interviewFlow });
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Position not found', error: error.message });
        } else {
            res.status(500).json({ message: 'Server error', error: String(error) });
        }
    }
};