import { Toaster } from "@blueprintjs/core";

export const capitalizeFirstLetter = (str: string) => {
    const firstLetter = str.charAt(0).toUpperCase();
    if(str.charAt(0) === firstLetter) return str;
    return firstLetter + str.slice(1);
};

const toaster = Toaster.create();
export const showNotification = toaster.show.bind(toaster);