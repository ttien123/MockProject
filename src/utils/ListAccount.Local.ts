import listAccountUser, { UserAccountType } from 'src/mock/ListAccount';

export const setListAccountUserToLS = (ListAccount: UserAccountType[]) => {
    localStorage.setItem('ListAccount', JSON.stringify(ListAccount));
};

export const getListAccountUserFromLS = () => {
    const result = localStorage.getItem('ListAccount');
    return result ? JSON.parse(result) : listAccountUser;
};

export const setUserInfoToLS = (user: UserAccountType | null) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const getUserInfoFromLS = () => {
    const result = localStorage.getItem('user');
    return result ? JSON.parse(result) : null;
};
