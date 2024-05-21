import { Button } from 'src/components/ui/button';
import { Label } from 'src/components/ui/label';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from 'src/components/ui/sheet';

interface Props {
    buttonOpen: React.ReactNode;
    content: React.ReactNode;
    open: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SheetCst({ buttonOpen, content, open, setOpen }: Props) {
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="bg-transparent border-none hover:bg-transparent p-0">
                {buttonOpen}
            </SheetTrigger>
            <SheetContent className="p-0 border-none">{content}</SheetContent>
        </Sheet>
    );
}
