let showErrorToast: ((message: string) => void) | null = null;

export const setErrorToastHandler = (handler: (message: string) => void) => {
    showErrorToast = handler;
};

export const getErrorToastHandler = () => showErrorToast;