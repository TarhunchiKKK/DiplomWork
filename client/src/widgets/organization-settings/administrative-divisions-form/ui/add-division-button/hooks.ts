import { useDivisionsStore } from "../../store";

export function useCreateDivision() {
    const divisionsCount = useDivisionsStore(state => state.divisions.length);

    const setDivision = useDivisionsStore(state => state.setDivision);

    const createDivision = () => {
        setDivision({
            title: `Отдел ${divisionsCount + 1}`,
            posts: []
        });
    };

    return createDivision;
}
