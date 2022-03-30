import environment from './environments';

if(process.env.NODE_ENV !== 'production') {
    const env = environment;
    console.log(env);
}

export const SECRET_KEY = process.env.SECRET || 'lagalmInd2022';