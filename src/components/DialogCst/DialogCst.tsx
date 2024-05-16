import { Dialog, DialogContent, DialogClose, DialogTrigger, DialogOverlay } from 'src/components/ui/dialog';

interface Props {
    ButtonClick?: React.ReactNode;
    ContentModal: React.ReactNode;
    ButtonClose: React.ReactNode;
    open: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogCst = ({ ButtonClick, ContentModal, ButtonClose, open, setOpen }: Props) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="block w-full">{ButtonClick}</DialogTrigger>
            <DialogContent className="text-black">
                {ContentModal}
                <DialogClose className="text-black">{ButtonClose}</DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default DialogCst;
