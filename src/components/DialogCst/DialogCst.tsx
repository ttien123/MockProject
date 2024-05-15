import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
} from 'src/components/ui/dialog';

interface Props {
    ButtonClick: React.ReactNode;
    ContentModal: React.ReactNode;
    ButtonClose: React.ReactNode;
}

const DialogCst = ({ ButtonClick, ContentModal, ButtonClose }: Props) => {
    return (
        <Dialog>
            <DialogTrigger className="block w-full">{ButtonClick}</DialogTrigger>
            <DialogContent className="text-black">
                {ContentModal}
                <DialogClose className="text-black">{ButtonClose}</DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default DialogCst;
