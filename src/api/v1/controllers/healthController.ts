import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";

const startTime: number = Date.now();

/**
 * Get the health status of the application
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns - JSON object with health status
 */
export const getHealth = (req: Request, res: Response): Response | void => {
  const uptime: number = (Date.now() - startTime) / 1000;

  return res.status(HTTP_STATUS.OK).json({
    status: "OK",
    uptime,
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
};