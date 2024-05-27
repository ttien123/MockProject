import { useDispatch, useSelector } from 'react-redux';
import Input from '../Input';
import { Label } from 'src/components/ui/label';
import { RadioGroup, RadioGroupItem } from 'src/components/ui/radio-group';
import { RootState } from 'src/store';
import { RepairInfoUserSchema, repairInfoUserSchema } from 'src/utils/rules';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputNumber from '../InputNumber';
import { useEffect } from 'react';
import { UserAccountType } from 'src/mock/ListAccount';
import { setListAccount } from 'src/state/ListAccount.slide';
import { toast } from 'react-toastify';

interface Props {
    setOpenModalRepairInfo: (value: React.SetStateAction<boolean>) => void;
    currentUser: UserAccountType;
}

export type RepairInfoUser = Pick<
    RepairInfoUserSchema,
    | 'emailPersonal'
    | 'phoneNumber'
    | 'contractType'
    | 'group'
    | 'residenceAddress'
    | 'typeUser'
    | 'maritalStatus'
    | 'stateAccount'
>;
const repairInfoUser = repairInfoUserSchema.pick([
    'emailPersonal',
    'phoneNumber',
    'contractType',
    'group',
    'residenceAddress',
    'typeUser',
    'stateAccount',
    'maritalStatus',
]);

const RepairInfoUser = ({ setOpenModalRepairInfo, currentUser }: Props) => {
    const role = useSelector((state: RootState) => state.RoleAuth.roleAuth);
    const listAccount = useSelector((state: RootState) => state.ListAccountSlide.ListAccount);
    const dispatch = useDispatch();
    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<RepairInfoUser>({
        defaultValues: {
            emailPersonal: '',
            contractType: '',
            group: '',
            phoneNumber: '',
            residenceAddress: '',
            typeUser: '',
            maritalStatus: '',
            stateAccount: '',
        },
        resolver: yupResolver(repairInfoUser),
    });

    const onSubmit = handleSubmit((data) => {
        const newList: UserAccountType[] = listAccount.map((item) => {
            if (item.id === currentUser.id) {
                return { ...item, ...data };
            } else {
                return item;
            }
        });
        dispatch(setListAccount(newList));
        setOpenModalRepairInfo(false);
        toast.success('Sửa thông tin thành công');
    });

    useEffect(() => {
        setValue('contractType', currentUser.contractType);
        setValue('group', currentUser.group);
        setValue('typeUser', currentUser.typeUser);
        setValue('stateAccount', currentUser.stateAccount);
        setValue('phoneNumber', currentUser.phoneNumber);
        setValue('residenceAddress', currentUser.residenceAddress);
        setValue('maritalStatus', currentUser.maritalStatus);
        if (currentUser.emailPersonal) {
            setValue('emailPersonal', currentUser.emailPersonal);
        }
    }, []);
    return (
        <div className="bg-white mt-4 min-h-[400px] p-4 rounded-lg">
            <form onSubmit={onSubmit}>
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 max-h-[450px] overflow-auto">
                    <div className="w-full ">
                        <Input
                            register={register}
                            name="emailPersonal"
                            labelName="Email cá nhân"
                            extendClassNameInput="text-[14px]"
                            placeholder="Email cá nhân"
                            errorsMessage={errors.emailPersonal?.message}
                        />
                        <Controller
                            control={control}
                            name="phoneNumber"
                            render={({ field }) => {
                                return (
                                    <InputNumber
                                        labelName="Số điện thoại"
                                        type="text"
                                        placeholder="Số điện thoại"
                                        onChange={(event) => {
                                            field.onChange(event);
                                        }}
                                        value={field.value}
                                        ref={field.ref}
                                        errorsMessage={errors.phoneNumber?.message}
                                    />
                                );
                            }}
                        />
                        <Input
                            register={register}
                            labelName="Địa chỉ thường trú"
                            name="residenceAddress"
                            extendClassNameInput="text-[14px]"
                            placeholder="Địa chỉ thường trú"
                            errorsMessage={errors.residenceAddress?.message}
                        />
                        <div className="text-[14px] font-semibold mb-2">Tình trạng hôn nhân</div>
                        <RadioGroup
                            defaultValue={currentUser.maritalStatus}
                            className="flex items-center"
                            onValueChange={(value) => setValue('maritalStatus', value)}
                        >
                            <div className="flex items-center space-x-2 mr-2">
                                <RadioGroupItem
                                    value="Chưa kết hôn"
                                    id="Chưa kết hôn"
                                    className="text-colorWeb w-[20px] h-[20px]"
                                />
                                <Label htmlFor="Chưa kết hôn" className="font-normal cursor-pointer">
                                    Chưa kết hôn
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2 ">
                                <RadioGroupItem
                                    value="Đã kết hôn"
                                    id="Đã kết hôn"
                                    className="text-colorWeb w-[20px] h-[20px]"
                                />
                                <Label htmlFor="Đã kết hôn" className="font-normal cursor-pointer">
                                    Đã kết hôn
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className={`w-full ${role === 'admin' ? 'block' : 'hidden'}`}>
                        <Input
                            register={register}
                            name="typeUser"
                            labelName="Loại nhân sự"
                            extendClassNameInput="text-[14px]"
                            placeholder="Loại nhân sự"
                            errorsMessage={errors.typeUser?.message}
                        />
                        <Input
                            name="contractType"
                            labelName="Loại hợp đồng"
                            register={register}
                            extendClassNameInput="text-[14px]"
                            placeholder="Loại hợp đồng"
                            errorsMessage={errors.contractType?.message}
                        />
                        <Input
                            register={register}
                            name="group"
                            labelName="Phòng ban (Nhóm)"
                            extendClassNameInput="text-[14px]"
                            placeholder="Phòng ban (Nhóm)"
                            errorsMessage={errors.group?.message}
                        />
                        <div className="text-[14px] font-semibold mb-2">Trạng thái tài khoản</div>

                        <RadioGroup
                            defaultValue={currentUser.stateAccount}
                            className="flex items-center"
                            onValueChange={(value) => setValue('stateAccount', value)}
                        >
                            <div className="flex items-center space-x-2 ">
                                <RadioGroupItem
                                    value="Active"
                                    id="Active"
                                    className="text-colorWeb w-[20px] h-[20px]"
                                />
                                <Label htmlFor="Active" className="font-normal cursor-pointer">
                                    Active
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2 ml-2">
                                <RadioGroupItem
                                    value="Disable"
                                    id="Disable"
                                    className="text-colorWeb w-[20px] h-[20px]"
                                />
                                <Label htmlFor="Disable" className="font-normal cursor-pointer">
                                    Disable
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
                <div className="mt-4 flex flex-col lg:flex-row items-center justify-center gap-4">
                    <button
                        type="button"
                        onClick={() => setOpenModalRepairInfo(false)}
                        className="bg-[#fff8ee] border border-[#fff8ee] hover:border-colorWeb transition-all duration-300 hover:bg-colorWeb hover:text-white rounded-sm  text-[14px] py-2 px-8 w-full lg:w-[200px] text-[#fea628] font-medium"
                    >
                        Hủy
                    </button>
                    <button className="bg-[#fea628] border border-[#fff8ee] hover:border-colorWeb transition-all duration-300 hover:bg-white hover:text-colorWeb rounded-sm text-[14px] py-2 px-8 w-full lg:w-[200px] text-white font-medium">
                        Lưu chỉnh sửa
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RepairInfoUser;
