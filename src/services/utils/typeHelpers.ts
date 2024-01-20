/**
 * Checks if two types T and U are the same.
 * If the types are not the same, this utility type will resolve to 'never'.
 */
type IsSame<T, U> = [T] extends [U] ? ([U] extends [T] ? true : never) : never;

/**
 * A function to enforce that the provided types T and U are the same.
 * When calling this function, if the types T and U are mismatched, a TypeScript error will be raised.
 *
 * @param _value - A value of type IsSame<T, U>. Typically this would be 'true' if T and U are the same type.
 *                 This parameter is not used within the function and exists only for type-checking purposes.
 */
export function enforceSameType<T, U>(_value: IsSame<T, U>): void {}
