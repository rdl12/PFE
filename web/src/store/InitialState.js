import config from './../config';

export const initialState = {
    isOpen: [], //for active default menu
    isTrigger: [], //for active default menu, set blank for horizontal
    ...config,
    isFullScreen: false, // static can't change
    isLoggedIn: false,
    userId: '',
    token: '',
    refreshToken: '',
    expiresOn: '',
    data: '',
    defib:[],
    defibDetails:[],
    addrese: '',
    pays :'' ,
    ville : '',
    province : '',
    codePostal : '',
    lat : '',
    long: '',
    defibPosted:[],
    showHeader:true,
    defibValide:[],
    stat_etat_defib : [],
    stat_prov_defib : [],
    personnes_inscrites:[],
    categories:[],
    formations:[],
    formationDetail : {},
    showToast: false,
    nbr_inscrit_formation:'',
    produits:'',
    product_detail:{},
    product_categories:[],
    user_chat : []
};

