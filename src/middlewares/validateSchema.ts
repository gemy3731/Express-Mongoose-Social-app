import type { NextFunction, Request, Response } from "express";
import type Joi from "joi";

const validateSchema = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const data = { ...req.body, ...req.params, ...req.query };
    if(req.file){
        data.file = req.file
    }
    
    const { error } = schema.validate(data);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return res.status(400).json({ error: errorMessage });
    }
    next();
}

export default validateSchema;