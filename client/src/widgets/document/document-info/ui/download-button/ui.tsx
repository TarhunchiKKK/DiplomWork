export const PendingPlaceholder = () => {
    return (
        <div className="flex flex-col items-center gap-2">
            <span className="font-bold text-yellow-300">Проверка документа</span>

            <span className="inline-block w-6 h-6 rounded-full border-4 border-yellow-100 border-t-gray-300 animate-spin"></span>
        </div>
    );
};

export const SuccessPlaceholder = () => {
    return <div className="text-center font-bold text-green-600">Документ валиден</div>;
};

export const ErrorPlaceholder = () => {
    return <span className="text-center font-bold text-red-400">Документ был изменен</span>;
};
