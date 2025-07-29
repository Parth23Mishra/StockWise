import jwt from 'jsonwebtoken';
import processEnvVar from './processEnvVariable.js';

const SECRETE_KEY = processEnvVar.JWT_SECRETE_KEY;


const generateToken = (res, userId) => {
    const generatedaccessToken = jwt.sign(
        {userId}, 
        SECRETE_KEY,
        {expiresIn:'1d'}
    );
    const refreshToken = jwt.sign(
        {userId}, 
        SECRETE_KEY,
        {expiresIn:'10d'}
    );

    // set the token in cookies 
    res.cookie(
        'accessToken', 
        generatedaccessToken,
        {
            httpOnly: true,
            secure: processEnvVar.NODE_ENV !== 'development',
            sameSite:'strict',
            maxAge: 24 * 60 * 60 * 1000,
        }
    );
    res.cookie(
        'refreshToken', 
        refreshToken,
        {
            httpOnly: true,
            secure: processEnvVar.NODE_ENV !== 'development',
            sameSite:'strict',
            maxAge: 24 * 60 * 60 * 1000,
        }
    );
};


export default generateToken;