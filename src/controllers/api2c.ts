import { Request, Response } from 'express';
import Api2 from '../models/api2';

export const getAllApi2 = async (req: Request, res: Response) => {
    try {
        const data = await Api2.find();
        res.json(data);
    } catch (error) {
        console.error('Erreur récupération Api2:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
