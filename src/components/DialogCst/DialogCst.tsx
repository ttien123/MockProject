import { Dialog, DialogContent, DialogClose, DialogTrigger } from 'src/components/ui/dialog';

interface Props {
    ButtonClick?: React.ReactNode;
    ContentModal: React.ReactNode;
    ButtonClose?: React.ReactNode;
    open: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    classNameContent?: string;
}

const DialogCst = ({ ButtonClick, ContentModal, ButtonClose, open, setOpen, classNameContent }: Props) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {ButtonClick && <DialogTrigger className="block w-full">{ButtonClick}</DialogTrigger>}
            <DialogContent className={classNameContent || 'text-black'}>
                {ContentModal}
                {ButtonClose && <DialogClose className="text-black">{ButtonClose}</DialogClose>}
            </DialogContent>
        </Dialog>
    );
};

export default DialogCst;
