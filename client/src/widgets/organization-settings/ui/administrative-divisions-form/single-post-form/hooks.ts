import { useForm } from "react-hook-form";
import { useDivisionsStore } from "../store";
import { TFormState, TProps } from "./types";

export function usePost({ divisionTempId, postTempId }: TProps) {
    const post = useDivisionsStore(state =>
        state.data.find(d => d.tempId === divisionTempId)?.posts.find(p => p.tempId === postTempId)
    );

    const addPost = useDivisionsStore(state => state.posts.add);
    const updatePost = useDivisionsStore(state => state.posts.update);
    const removePost = useDivisionsStore(state => state.posts.remove);

    const form = useForm<TFormState>({
        defaultValues: {
            title: post?.title ?? ""
        }
    });

    return {
        form,
        onSubmit: () => {
            addPost(divisionTempId);
        },
        post: {
            update: () => {
                updatePost(divisionTempId, postTempId, form.getValues().title);
            },
            remove: () => {
                removePost(divisionTempId, postTempId);
            }
        }
    };
}
