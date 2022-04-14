
import { Request, Response } from 'express';

const successResponse = (
    req: Request,
    res:Response,
    message = "",
    data:any,
    token = "",
    code = 200
  ) =>
    res.send({
      code,
      message,
      data,
      token,
      success: true,
    });
  
  const errorResponse = (
    req:Request,
    res:Response,
    errorMessage = "Something went wrong",
    code = 500,
    error = {}
  ) => {
    res.status(500).json({
      code,
      errorMessage,
      error,
      data: null,
      success: false,
    });
  };
  
  module.exports = {
    successResponse,
    errorResponse,
  };