import { type ElementType } from 'react';
import {
    useFloating,
    shift,
    offset,
    type Placement,
    flip,
    autoUpdate,
    useDismiss,
    useRole,
    useInteractions,
    useClick,
} from '@floating-ui/react';

interface Props {
    children: React.ReactNode;
    renderPopover: React.ReactNode;
    className?: string;
    classNamePosition?: string;
    as?: ElementType;
    placement?: Placement;
    isToggle?: boolean;
    isClick?: boolean;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PopoverCst({
    children,
    className,
    classNamePosition,
    renderPopover,
    as: Element = 'div',
    placement = 'bottom',
    setOpen,
    open,
    isToggle,
    isClick,
}: Props) {
    const data = useFloating({
        open,
        onOpenChange: setOpen,
        middleware: [offset(10), flip(), shift()],
        whileElementsMounted: autoUpdate,
        transform: false,
        placement,
    });
    const { refs, floatingStyles, context } = data;
    const click = useClick(context, {
        toggle: isToggle,
        enabled: isClick,
    });
    const dismiss = useDismiss(context);
    const role = useRole(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([click, role, dismiss]);

    return (
        <Element className={className}>
            <div ref={refs.setReference} {...getReferenceProps()}>
                {children}
            </div>
            {open && (
                <div
                    ref={refs.setFloating}
                    style={{
                        ...floatingStyles,
                    }}
                    className={classNamePosition}
                    {...getFloatingProps()}
                >
                    {renderPopover}
                </div>
            )}
        </Element>
    );
}
