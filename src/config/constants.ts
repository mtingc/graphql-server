import environment from './environments';

if (process.env.NODE_ENV !== 'production') {
    const env = environment;
    console.log(env);
}

export const SECRET_KEY = process.env.SECRET || 'lagalmInd2022';

export enum COLLECTIONS {
    USERS = 'users',
    PERMISSIONS = 'permissions',
    CONTACTS = 'contacts',
    JOB = 'jobs',
    VACANTS = 'vacants',
    PURCHASES_SUPPLIERS = 'purchases_suppliers',
    PURCHASES_PRODUCTS_SERVICES = 'purchases_products_services',
    PURCHASES_REQUISITIONS = 'purchases_requisitions'
}

export enum MESSAGES {
    TOKEN_VERIFICATION_FAILED = 'Token no valido, inicia sesion de nuevo.',
    DETAILS_UNDEFINED = 'Detalles no definidos.',
    DETAILS_STATUS = 'El estado debe ser true.',
    DETAILS_USER_CREATOR = 'Usuario creador no definido.',
    DETAILS_USER_MODIFIER = 'El usuario modificador debe ir vacio.'
}

/**
 * H - Hours
 * M - Minutes
 * S - Secondes
 */
export enum EXPIRETIME {
    H1 = 60 * 60,
    H24 = 24 * H1,
    M15 = H1 / 4,
    M20 = H1 / 3,
    D3 = H24 * 3
}