import { useForm } from "react-hook-form";
import { useDivisionsStore } from "../store";
import { TFormState } from "./types";
import { useState } from "react";

export function useSingleDivision(divisionTempId: string) {
    const division = useDivisionsStore(state => state.data.find(d => d.tempId === divisionTempId));

    const updateDivision = useDivisionsStore(state => state.divisions.update);
    const removeDivision = useDivisionsStore(state => state.divisions.remove);

    const [postsVisible, setPostsVisible] = useState(false);

    const form = useForm<TFormState>({
        defaultValues: {
            title: division?.title ?? ""
        }
    });

    return {
        form,
        onSubmit: () => {
            updateDivision(divisionTempId, form.getValues().title);
        },
        posts: {
            data: division?.posts ?? [],
            visible: postsVisible,
            setVisible: () => {
                setPostsVisible(true);
            },
            setInvisible: () => {
                setPostsVisible(false);
            }
        },
        division: {
            update: () => {
                updateDivision(divisionTempId, form.getValues().title);
            },
            remove: () => {
                removeDivision(divisionTempId);
            }
        }
    };
}
