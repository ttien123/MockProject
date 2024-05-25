import { Sheet, SheetContent, SheetTrigger } from 'src/components/ui/sheet';

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
            <SheetContent className="p-0 border-none w-screen">{content}</SheetContent>
        </Sheet>
    );
}
