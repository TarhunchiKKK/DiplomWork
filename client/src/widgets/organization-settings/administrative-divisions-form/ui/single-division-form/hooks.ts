import { useForm } from "react-hook-form";
import { useDivisionsStore } from "../../store";
import { TPostsFormState, TTitleFormState } from "./types";
import { useCompareableSet } from "@/shared/hooks";
import { toast } from "sonner";

export function useDivisionPostsForm(index: number) {
    const division = useDivisionsStore(state => state.divisions[index]);
    const setDivision = useDivisionsStore(state => state.setDivision);

    const postsSet = useCompareableSet(division.posts, post => post.title);

    const form = useForm<TPostsFormState>({
        defaultValues: {
            value: ""
        }
    });

    const addPost = (title: string) => {
        const result = postsSet.add({ title });

        if (result) {
            setDivision({
                ...division,
                posts: division.posts.concat({ title })
            });
        } else {
            toast.warning("Пост уже существует");
        }
    };

    const onSubmit = form.handleSubmit((data: TPostsFormState) => {
        addPost(data.value);

        form.reset();
    });

    return {
        postsSet,
        form,
        onSubmit
    };
}

export function useDivisionTitleForm(index: number) {
    const division = useDivisionsStore(state => state.divisions[index]);

    const setTitle = useDivisionsStore(state => state.setTitle);

    const form = useForm<TTitleFormState>({
        defaultValues: {
            value: division.title || ""
        }
    });

    const onSubmit = form.handleSubmit((data: TTitleFormState) => {
        setTitle(data.value, index);
    });

    return {
        form,
        onSubmit
    };
}
