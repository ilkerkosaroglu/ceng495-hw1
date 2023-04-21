export const capitalizeFirstLetter = (str: string) => {
    const firstLetter = str.charAt(0).toUpperCase();
    if(str.charAt(0) === firstLetter) return str;
    return firstLetter + str.slice(1);
};