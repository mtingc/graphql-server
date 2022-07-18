import environment from './environments';

if (process.env.NODE_ENV !== 'production') {
    const env = environment;
    console.log(env);
}

export const SECRET_KEY = process.env.SECRET || 'lagalmInd2022';

export enum COLLECTIONS {
    USERS = 'users',
    PERMISSIONS = 'rrhh_permissions',
    CONTACTS = 'rrhh_contacts',
    JOB = 'rrhh_jobs',
    VACANTS = 'rrhh_vacants',
    PURCHASES_SUPPLIERS = 'purchases_suppliers',
    PURCHASES_PRODUCTS_SERVICES = 'purchases_products_services',
    PURCHASES_REQUISITIONS = 'purchases_requisitions'
}

export enum MESSAGES {
    TOKEN_VERIFICATION_FAILED = 'Token no valido, inicia sesion de nuevo.'
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