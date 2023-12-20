export { };

declare global {
    interface StringConstructor {
        isEmpty(str: string): boolean;
        isNull(str: string | null | undefined): boolean;
        isNullOrEmpty(str: string | null | undefined): boolean;
    }
}

String.isEmpty = function (str: string): boolean {
    return str === "";
}

String.isNull = function (str: string | null | undefined): boolean {
    return str == null;
}

String.isNullOrEmpty = function (str: string | null | undefined): boolean {
    return this.isNull(str) || this.isEmpty(str as string);
}