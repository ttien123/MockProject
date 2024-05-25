const path = {
    login: '/',
    UserHomePage: '/UserHomePage',
    AdminHomePage: '/AdminHomePage',
    forgotPassword: '/forgotPassword',
    changePassword: '/changePassword',
    notFoundPage: '/notFoundPage',
    timekeeping: '/timekeeping',
    profileUserPage: '/profileUserPage/:id',
} as const;

export default path;
