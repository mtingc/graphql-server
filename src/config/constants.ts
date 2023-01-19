import environment from './environments';

if (process.env.NODE_ENV !== 'production') {
    const env = environment;
    console.log(env);
}

export const SECRET_KEY = process.env.SECRET || 'lagalmInd2022';

export enum COLLECTIONS {
    USERS = 'users',
    RRHH_PERMISSIONS = 'rrhh_permissions',
    RRHH_CONTACTS = 'rrhh_contacts',
    RRHH_WORKAREAS = 'rrhh_workAreas',
    RRHH_VACANTS = 'rrhh_vacants',
    PURCHASES_SUPPLIERS = 'purchases_suppliers',
    PURCHASES_PRODUCTS_SERVICES = 'purchases_products',
    PURCHASES_REQUISITIONS = 'purchases_requisitions',
    SALES_CUSTOMERS = 'sales_customers',
    SALES_PROSPECTS = 'sales_prospects',
    IT_DEVICE = 'it_devices',
    IT_SCREEN = 'it_screens',
    IT_INPUT_DEVICE = 'it_inputDevices',
    IT_OUTPUT_DEVICE = 'it_outputDevices',
    IT_CONSUMABLE = 'it_consumables',
    IT_STORAGE = 'it_storages',
    IT_RAM = 'it_rams',
    IT_GRAPHIC = 'it_graphics',
    IT_COOLING = 'it_coolings',
    IT_EQUIPMENT = 'it_equipments',
    IT_COMPLEMENTARY = 'it_complementaries',
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