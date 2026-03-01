import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpContstants";

const startTime: number = Date.now();

/**
 * Get the health status of the application
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns - JSON object with health status
 */
// Controller to get the health status of the application
export const getHealth = (req: Request, res: Response): void => {
  // Calculate the uptime of the application
  const uptime: number = (Date.now() - startTime) / 1000;

  // Send an OK response with the health status
  res.status(HTTP_STATUS.OK).json({
    status: "OK",
    uptime,
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
};