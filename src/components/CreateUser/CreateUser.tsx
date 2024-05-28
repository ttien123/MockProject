import React, { useEffect, useState } from 'react';
import Input from '../Input';
import InputNumber from '../InputNumber';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Calendar } from 'src/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';
import { formatDate } from 'src/utils/utils';
import { RepairInfoUserSchema, repairInfoUserSchema } from 'src/utils/rules';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TimekeepingType } from 'src/mock/ListAccount';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { setListAccount } from 'src/state/ListAccount.slide';
import { toast } from 'react-toastify';

interface Props {
    setOpenCreateAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

export type RepairInfoUser = Pick<
    RepairInfoUserSchema,
    | 'phoneNumber'
    | 'contractType'
    | 'group'
    | 'residenceAddress'
    | 'typeUser'
    | 'maritalStatus'
    | 'stateAccount'
    | 'birthday'
    | 'email'
    | 'gender'
    | 'password'
    | 'name'
    | 'userManager'
>;
const repairInfoUser = repairInfoUserSchema.pick([
    'phoneNumber',
    'contractType',
    'group',
    'residenceAddress',
    'typeUser',
    'stateAccount',
    'maritalStatus',
    'birthday',
    'gender',
    'email',
    'password',
    'name',
    'userManager',
]);

const CreateUser = ({ setOpenCreateAccount }: Props) => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [isSelectedDate, setIsSelectedDate] = useState<boolean>(false);
    const listAccount = useSelector((state: RootState) => state.ListAccountSlide.ListAccount);
    const dispatch = useDispatch();
    const {
        register,
        setError,
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<RepairInfoUser>({
        defaultValues: {
            email: '',
            contractType: '',
            group: '',
            phoneNumber: '',
            residenceAddress: '',
            typeUser: '',
            maritalStatus: '',
            stateAccount: '',
            birthday: '',
            gender: '',
            name: '',
            password: '',
            userManager: '',
        },
        resolver: yupResolver(repairInfoUser),
    });

    const onSubmit = handleSubmit((data) => {
        const isValidEmail = listAccount.find((item) => item.email === data.email);
        if (isValidEmail) {
            setError('email', {
                type: 'error',
                message: 'Email đã tồn tại',
            });
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const newUser: any = {
                ...data,
                id: uuidv4() as string,
                processCareer: [] as {
                    start: string;
                    end: string;
                    position: string;
                }[],
                emailPersonal: '',
                role: 'user',
                listTimekeeping: [] as TimekeepingType[],
            };
            const newListAccount = [newUser, ...listAccount];
            dispatch(setListAccount(newListAccount));
            toast.success('Tạo tài khoản thành công');
            setOpenCreateAccount(false);
        }
    });

    useEffect(() => {
        setValue('maritalStatus', 'Chưa kết hôn');
        setValue('stateAccount', 'Active');
        setValue('gender', 'Male');
    });

    useEffect(() => {
        date && setIsSelectedDate(false);
        date && setValue('birthday', formatDate(date.toString()));
    }, [date, setValue]);
    return (
        <div className="bg-white mt-4 min-h-[400px] p-4 rounded-lg">
            <form onSubmit={onSubmit}>
                <div className=" max-h-[450px] overflow-auto">
                    <div className="flex flex-col lg:flex-row lg:gap-4">
                        <div className="w-full ">
                            <Input
                                register={register}
                                name="email"
                                labelName="Email"
                                extendClassNameInput="text-[14px]"
                                placeholder="Email"
                                errorsMessage={errors.email?.message}
                            />
                            <Input
                                register={register}
                                labelName="Họ Tên"
                                name="name"
                                extendClassNameInput="text-[14px]"
                                placeholder="Name..."
                                errorsMessage={errors.name?.message}
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
                            <div>
                                <div className="mb-2 block font-semibold text-[14px]">Ngày sinh</div>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant={'outline'} className="h-[45px] w-full shadow-inputBS">
                                            <span className="mr-4">
                                                {date ? formatDate(date.toString()) : 'Pick a date'}
                                            </span>
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            captionLayout="dropdown-buttons"
                                            fromYear={1900}
                                            showOutsideDays
                                            fixedWeeks
                                            toYear={2024}
                                            disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <div className="mt-1 mb-1 text-red-600 min-h-[21px] font-semibold text-[14px]">
                                    {isSelectedDate && 'Trường này là bắt buộc'}
                                </div>
                            </div>
                        </div>
                        <div className={`w-full `}>
                            <Input
                                register={register}
                                name="password"
                                type="password"
                                labelName="Mật khẩu"
                                extendClassNameInput="text-[14px]"
                                placeholder="Password"
                                errorsMessage={errors.password?.message}
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
                            <Input
                                register={register}
                                name="typeUser"
                                labelName="Loại nhân sự"
                                extendClassNameInput="text-[14px]"
                                placeholder="Loại nhân sự"
                                errorsMessage={errors.typeUser?.message}
                            />
                            <Input
                                register={register}
                                name="userManager"
                                labelName="Người quản lý"
                                extendClassNameInput="text-[14px]"
                                placeholder="Người quản lý"
                                errorsMessage={errors.userManager?.message}
                            />
                        </div>
                    </div>
                    <div className="flex lg:items-center justify-between flex-col lg:flex-row">
                        <div className="mt-3 lg:mt-0">
                            <div className="text-[14px] font-semibold mb-2">Tình trạng hôn nhân</div>
                            <RadioGroup
                                defaultValue={'Chưa kết hôn'}
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

                        <div className="mt-3 lg:mt-0">
                            <div className="text-[14px] font-semibold mb-2">Trạng thái tài khoản</div>
                            <RadioGroup
                                defaultValue={'Active'}
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

                        <div className="mt-3 lg:mt-0">
                            <div className="text-[14px] font-semibold mb-2">Giới tính</div>
                            <RadioGroup
                                defaultValue={'Male'}
                                className="flex items-center]"
                                onValueChange={(value) => setValue('gender', value)}
                            >
                                <div className="flex items-center space-x-2 ">
                                    <RadioGroupItem
                                        value="Male"
                                        id="Male"
                                        className="text-colorWeb w-[20px] h-[20px]"
                                    />
                                    <Label htmlFor="Male" className="font-normal cursor-pointer">
                                        Nam
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2 ml-2">
                                    <RadioGroupItem
                                        value="Female"
                                        id="Female"
                                        className="text-colorWeb w-[20px] h-[20px]"
                                    />
                                    <Label htmlFor="Female" className="font-normal cursor-pointer">
                                        Nữ
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex flex-col lg:flex-row items-center justify-center gap-4">
                    <button
                        type="button"
                        onClick={() => setOpenCreateAccount(false)}
                        className="bg-[#fff8ee] border border-[#fff8ee] hover:border-colorWeb transition-all duration-300 hover:bg-colorWeb hover:text-white rounded-sm  text-[14px] py-2 px-8 w-full lg:w-[200px] text-[#fea628] font-medium"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={() => {
                            if (!isSelectedDate && !date) {
                                setIsSelectedDate(true);
                            }
                        }}
                        className="bg-[#fea628] border border-[#fff8ee] hover:border-colorWeb transition-all duration-300 hover:bg-white hover:text-colorWeb rounded-sm text-[14px] py-2 px-8 w-full lg:w-[200px] text-white font-medium"
                    >
                        Hoàn thành
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateUser;
