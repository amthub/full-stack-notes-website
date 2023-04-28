import jwt from 'jsonwebtoken'
import authModel from '../models/auth.js';

class authMiddleware{
    static authreq = (req, res, next) => {
        const token = req.cookies.jwt;
        // console.log(token)
        if(token){
          jwt.verify(token, 'amt-hub', (err, decodedToken) => {
            if(err){
                console.log(err.message)
                res.redirect('/login')
            }
            // console.log(decodedToken)
            next();
          })
        }
        else{
            res.redirect('/login')
        }
    }

    static checkUser = (req, res, next) => {
       const token = req.cookies.jwt;
       if(token){
         jwt.verify(token, 'amt-hub', async(err, decodedToken) => {
            if(err){
                res.locals.user = null;
                next();
            }
            else{
                const user = await authModel.findById(decodedToken.id);
               res.locals.user = user;
               next();
            }
         })
       }else{
        res.locals.user = null;
        next();
       }
    }
}

export default authMiddleware