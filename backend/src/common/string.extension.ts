export {};

declare global {
    interface StringConstructor {
        isEmpty(str: string): boolean;
        isNull(str: string | null | undefined): boolean;
        isNullOrEmpty(str: string | null | undefined): boolean;
    }
}

String.isEmpty = (str: string): boolean => str === '';

String.isNull = (str: string | null | undefined): boolean => str == null;

String.isNullOrEmpty = (str: string | null | undefined): boolean => String.isNull(str) || String.isEmpty(str as string);
