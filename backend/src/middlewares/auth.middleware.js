 import jwt from 'jsonwebtoken';
 import {config} from '../config/env.js';
 import {errorResponse} from '../utils/response.util.js';

 export const authenticate =(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return errorResponse(res,401,'Authorization header missing or malformed');
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token,config.jwtSecret);
        req.user = decoded;
        next();
    }catch(error){
        if(error.name === 'TokenExpiredError'){
            return errorResponse(res,401,'Token has expired');
        }
        if(error.name === 'JsonWebTokenError'){
            return errorResponse(res,401,'Invalid token');
        }

        return errorResponse(res,500,'Internal Server Error',error.message);
    }
 }