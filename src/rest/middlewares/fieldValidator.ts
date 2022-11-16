import { response, request, NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';

export const fieldValidator = (
	req = request,
	res = response,
	next: NextFunction
): Response | void => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.mapped(),
		});
	}
	next();
};
