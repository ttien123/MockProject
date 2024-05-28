const path = {
    login: '/login',
    UserHomePage: '/user/home',
    AdminHomePage: '/admin/home',
    forgotPassword: '/password/forgot-password',
    changePassword: '/password/change-password',
    notFoundPage: '/not-found',
    timekeeping: '/timekeeping',
    profileUserPage: '/profileUserPage/:id',
} as const;

export default path;
