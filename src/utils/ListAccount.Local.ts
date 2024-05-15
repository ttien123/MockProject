import listAccountUser, { UserAccountType } from 'src/mock/ListAccount';

export const setListAccountUserFromLS = (ListAccount: UserAccountType[]) => {
    localStorage.setItem('ListAccount', JSON.stringify(ListAccount));
};

export const getListAccountUserFromLS = () => {
    const result = localStorage.getItem('listExercise');
    return result ? JSON.parse(result) : listAccountUser;
};
