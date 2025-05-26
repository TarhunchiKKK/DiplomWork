import { PropsWithChildren } from "react";

type TParentProps = PropsWithChildren<{
    className?: string;
}>;

export function CenteredChildParent({ className, children }: TParentProps) {
    return <div className={"relative " + className}>{children}</div>;
}

export function CenteredChild({ children }: PropsWithChildren) {
    return <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{children}</div>;
}
