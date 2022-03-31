import jwt from 'jsonwebtoken';
import { SECRET_KEY, MESSAGES, EXPIRETIME } from './../config/constants';
import { IJwt } from '../interfaces/jwt.interface';

class JWT {
    private secretKey = SECRET_KEY as string;

    // Payload information with expiration date
    sign(data: IJwt, expiresIn: number = EXPIRETIME.H24) {
        return jwt.sign(
            { user: data.user },
            this.secretKey,
            { expiresIn }
        );
    }

    verify(token: string) {
        try {
            return jwt.verify(token, this.secretKey) as string;
        } catch(e) {
            return MESSAGES.TOKEN_VERIFICATION_FAILED;
        }
    }
}

export default JWT;