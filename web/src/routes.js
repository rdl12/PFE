import React from 'react';
import $ from 'jquery';


window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));

const UIBasicButton = React.lazy(() => import('./Demo/UIElements/Basic/Button'));
const UIBasicBadges = React.lazy(() => import('./Demo/UIElements/Basic/Badges'));
const UIBasicBreadcrumbPagination = React.lazy(() => import('./Demo/UIElements/Basic/BreadcrumbPagination'));

const UIBasicCollapse = React.lazy(() => import('./Demo/UIElements/Basic/Collapse'));
const UIBasicTabsPills = React.lazy(() => import('./Demo/UIElements/Basic/TabsPills'));
const UIBasicBasicTypography = React.lazy(() => import('./Demo/UIElements/Basic/Typography'));

const FormsElements = React.lazy(() => import('./Demo/Forms/FormsElements'));

const BootstrapTable = React.lazy(() => import('./Demo/Tables/BootstrapTable'));

const Nvd3Chart = React.lazy(() => import('./Demo/Charts/Nvd3Chart/index'));

const GoogleMap = React.lazy(() => import('./Demo/Maps/GoogleMap/index'));

const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const OtherDocs = React.lazy(() => import('./Demo/Other/Docs'));
const AddDefib = React.lazy(() => import('./Demo/AddDefib/AddDefib'));
const FormationAdd = React.lazy(() => import('./Demo/Formation/FormationAdd'));
const FormationList = React.lazy(() => import('./Demo/Formation/FormationList'));
const SubscriptionList = React.lazy(() => import('./Demo/Formation/SubscriptionList'));
const FormationDetail = React.lazy(() => import('./Demo/Formation/FormationDetail'));
const ProduitList = React.lazy(() => import('./Demo/Produit/ProduitList'));
const ProduitAdd = React.lazy(() => import('./Demo/Produit/ProduitAdd'));
const ProduitDetail = React.lazy(() => import('./Demo/Produit/ProduitDetail'));
const ModifyPassword = React.lazy(() => import('./Demo/Profil/ModifyPassword/ModifyPassword'));
const Notification = React.lazy(() => import('./Demo/Notification/SendNotification'));
const routes = [
    { path: '/dashboard', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/basic/button', exact: true, name: 'Basic Button', component: UIBasicButton },
    { path: '/basic/badges', exact: true, name: 'Basic Badges', component: UIBasicBadges },
    { path: '/basic/breadcrumb-paging', exact: true, name: 'Basic Breadcrumb Pagination', component: UIBasicBreadcrumbPagination },
    { path: '/basic/collapse', exact: true, name: 'Basic Collapse', component: UIBasicCollapse },
    { path: '/basic/tabs-pills', exact: true, name: 'Basic Tabs & Pills', component: UIBasicTabsPills },
    { path: '/basic/typography', exact: true, name: 'Basic Typography', component: UIBasicBasicTypography },
    { path: '/forms/form-basic', exact: true, name: 'Forms Elements', component: FormsElements },
    { path: '/table', exact: true, name: 'Bootstrap Table', component: BootstrapTable },
    { path: '/charts/nvd3', exact: true, name: 'Nvd3 Chart', component: Nvd3Chart },
    { path: '/maps/google-map', exact: true, name: 'Google Map', component: GoogleMap },
    { path: '/sample-page/:id', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },
    { path: '/Ajout', exact: true, name: 'Ajout de defibrilateur', component: AddDefib },
    { path: '/Formation/Ajouter', exact: true, name: 'Ajout de defibrilateur', component: FormationAdd },
    { path: '/Formation/list', exact: true, name: 'Ajout de defibrilateur', component: FormationList },
    { path: '/Formation/Inscrit', exact: true, name: 'Liste des personnes inscrits', component: SubscriptionList },
    { path: '/Formation/Detail/:id', exact: true, name: 'Detail Formation', component: FormationDetail },
    { path: '/Produit/list', exact: true, name: 'Liste des produits', component: ProduitList },
    { path: '/Produit/Ajouter', exact: true, name: 'Ajout de produit', component: ProduitAdd },
    { path: '/Produit/Detail/:id', exact: true, name: 'detail de produit', component: ProduitDetail },
    { path: '/Profil/ModifyPassword', exact: true, name: 'modifer mot de passe ', component: ModifyPassword },
    { path: '/Notification', exact: true, name: 'envoyer une notification ', component: Notification },
];

export default routes;