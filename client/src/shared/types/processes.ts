export type TProcessProps<D, P> = {
    next: (_: D) => void;

    payload: P;
};
