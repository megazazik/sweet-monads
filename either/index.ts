import { Monad } from "@sweet-monads/interfaces";

enum EitherType {
  Left = "Left",
  Right = "Right"
}

function isWrappedFunction<A, B, L>(
  m: Either<L, A> | Either<L, (a: A) => B>
): m is Either<L, (a: A) => B> {
  return typeof m.value === "function";
}

export function mergeInOne<L1, R1>(values: [Either<L1, R1>]): Either<L1, [R1]>;
export function mergeInOne<L1, R1, L2, R2>(
  values: [Either<L1, R1>, Either<L2, R2>]
): Either<L1 | L2, [R1, R2]>;
export function mergeInOne<L1, R1, L2, R2, L3, R3>(
  values: [Either<L1, R1>, Either<L2, R2>, Either<L3, R3>]
): Either<L1 | L2 | L3, [R1, R2, R3]>;
export function mergeInOne<L1, R1, L2, R2, L3, R3, L4, R4>(
  values: [Either<L1, R1>, Either<L2, R2>, Either<L3, R3>, Either<L4, R4>]
): Either<L1 | L2 | L3 | L4, [R1, R2, R3, R4]>;
export function mergeInOne<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5>(
  values: [
    Either<L1, R1>,
    Either<L2, R2>,
    Either<L3, R3>,
    Either<L4, R4>,
    Either<L5, R5>
  ]
): Either<L1 | L2 | L3 | L4 | L5, [R1, R2, R3, R4, R5]>;
export function mergeInOne<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5, L6, R6>(
  values: [
    Either<L1, R1>,
    Either<L2, R2>,
    Either<L3, R3>,
    Either<L4, R4>,
    Either<L5, R5>,
    Either<L6, R6>
  ]
): Either<L1 | L2 | L3 | L4 | L5 | L6, [R1, R2, R3, R4, R5, R6]>;
export function mergeInOne<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5, L6, R6, L7, R7>(
  values: [
    Either<L1, R1>,
    Either<L2, R2>,
    Either<L3, R3>,
    Either<L4, R4>,
    Either<L5, R5>,
    Either<L6, R6>,
    Either<L7, R7>
  ]
): Either<L1 | L2 | L3 | L4 | L5 | L6 | L7, [R1, R2, R3, R4, R5, R6, R7]>;
export function mergeInOne<
  L1,
  R1,
  L2,
  R2,
  L3,
  R3,
  L4,
  R4,
  L5,
  R5,
  L6,
  R6,
  L7,
  R7,
  L8,
  R8
>(
  values: [
    Either<L1, R1>,
    Either<L2, R2>,
    Either<L3, R3>,
    Either<L4, R4>,
    Either<L5, R5>,
    Either<L6, R6>,
    Either<L7, R7>,
    Either<L8, R8>
  ]
): Either<
  L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8,
  [R1, R2, R3, R4, R5, R6, R7, R8]
>;
export function mergeInOne<
  L1,
  R1,
  L2,
  R2,
  L3,
  R3,
  L4,
  R4,
  L5,
  R5,
  L6,
  R6,
  L7,
  R7,
  L8,
  R8,
  L9,
  R9
>(
  values: [
    Either<L1, R1>,
    Either<L2, R2>,
    Either<L3, R3>,
    Either<L4, R4>,
    Either<L5, R5>,
    Either<L6, R6>,
    Either<L7, R7>,
    Either<L8, R8>,
    Either<L9, R9>
  ]
): Either<
  L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9,
  [R1, R2, R3, R4, R5, R6, R7, R8, R9]
>;
export function mergeInOne<
  L1,
  R1,
  L2,
  R2,
  L3,
  R3,
  L4,
  R4,
  L5,
  R5,
  L6,
  R6,
  L7,
  R7,
  L8,
  R8,
  L9,
  R9,
  L10,
  R10
>(
  values: [
    Either<L1, R1>,
    Either<L2, R2>,
    Either<L3, R3>,
    Either<L4, R4>,
    Either<L5, R5>,
    Either<L6, R6>,
    Either<L7, R7>,
    Either<L8, R8>,
    Either<L9, R9>,
    Either<L10, R10>
  ]
): Either<
  L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9 | L10,
  [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]
>;
export function mergeInOne(eithers: Array<Either<unknown, unknown>>) {
  return eithers.reduce(
    (res: Either<unknown, Array<unknown>>, v) =>
      v.chain(v => res.map(res => res.concat([v]))),
    right<unknown, Array<unknown>>([])
  );
}

export const merge = mergeInOne;

export function mergeInMany<L1, R1>(values: [Either<L1, R1>]): Either<Array<L1>, [R1]>;
export function mergeInMany<L1, R1, L2, R2>(
  values: [Either<L1, R1>, Either<L2, R2>]
): Either<Array<L1 | L2>, [R1, R2]>;
export function mergeInMany<L1, R1, L2, R2, L3, R3>(
  values: [Either<L1, R1>, Either<L2, R2>, Either<L3, R3>]
): Either<Array<L1 | L2 | L3>, [R1, R2, R3]>;
export function mergeInMany<L1, R1, L2, R2, L3, R3, L4, R4>(
  values: [Either<L1, R1>, Either<L2, R2>, Either<L3, R3>, Either<L4, R4>]
): Either<Array<L1 | L2 | L3 | L4>, [R1, R2, R3, R4]>;
export function mergeInMany<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5>(
  values: [
    Either<L1, R1>,
    Either<L2, R2>,
    Either<L3, R3>,
    Either<L4, R4>,
    Either<L5, R5>
  ]
): Either<Array<L1 | L2 | L3 | L4 | L5>, [R1, R2, R3, R4, R5]>;
export function mergeInMany<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5, L6, R6>(
  values: [
    Either<L1, R1>,
    Either<L2, R2>,
    Either<L3, R3>,
    Either<L4, R4>,
    Either<L5, R5>,
    Either<L6, R6>
  ]
): Either<Array<L1 | L2 | L3 | L4 | L5 | L6>, [R1, R2, R3, R4, R5, R6]>;
export function mergeInMany<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5, L6, R6, L7, R7>(
  values: [
    Either<L1, R1>,
    Either<L2, R2>,
    Either<L3, R3>,
    Either<L4, R4>,
    Either<L5, R5>,
    Either<L6, R6>,
    Either<L7, R7>
  ]
): Either<
  Array<L1 | L2 | L3 | L4 | L5 | L6 | L7>,
  [R1, R2, R3, R4, R5, R6, R7]
>;
export function mergeInMany<
  L1,
  R1,
  L2,
  R2,
  L3,
  R3,
  L4,
  R4,
  L5,
  R5,
  L6,
  R6,
  L7,
  R7,
  L8,
  R8
>(
  values: [
    Either<L1, R1>,
    Either<L2, R2>,
    Either<L3, R3>,
    Either<L4, R4>,
    Either<L5, R5>,
    Either<L6, R6>,
    Either<L7, R7>,
    Either<L8, R8>
  ]
): Either<
  Array<L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8>,
  [R1, R2, R3, R4, R5, R6, R7, R8]
>;
export function mergeInMany<
  L1,
  R1,
  L2,
  R2,
  L3,
  R3,
  L4,
  R4,
  L5,
  R5,
  L6,
  R6,
  L7,
  R7,
  L8,
  R8,
  L9,
  R9
>(
  values: [
    Either<L1, R1>,
    Either<L2, R2>,
    Either<L3, R3>,
    Either<L4, R4>,
    Either<L5, R5>,
    Either<L6, R6>,
    Either<L7, R7>,
    Either<L8, R8>,
    Either<L9, R9>
  ]
): Either<
  Array<L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9>,
  [R1, R2, R3, R4, R5, R6, R7, R8, R9]
>;
export function mergeInMany<
  L1,
  R1,
  L2,
  R2,
  L3,
  R3,
  L4,
  R4,
  L5,
  R5,
  L6,
  R6,
  L7,
  R7,
  L8,
  R8,
  L9,
  R9,
  L10,
  R10
>(
  values: [
    Either<L1, R1>,
    Either<L2, R2>,
    Either<L3, R3>,
    Either<L4, R4>,
    Either<L5, R5>,
    Either<L6, R6>,
    Either<L7, R7>,
    Either<L8, R8>,
    Either<L9, R9>,
    Either<L10, R10>
  ]
): Either<
  Array<L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9 | L10>,
  [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]
>;
export function mergeInMany(eithers: Array<Either<unknown, unknown>>) {
  return eithers.reduce(
    (
      res: Either<Array<unknown>, Array<unknown>>,
      v
    ): Either<Array<unknown>, Array<unknown>> => {
      if (res.isLeft()) {
        return v.isLeft() ? left(res.value.concat([v.value])) : res;
      }
      return v.isLeft()
        ? left([v.value])
        : (v.chain(v => res.map(res => [...res, v])) as Either<
            Array<unknown>,
            Array<unknown>
          >);
    },
    right<Array<unknown>, Array<unknown>>([])
  );
}

export function from<T>(v: T) {
  return this.right(v);
}

export function right<L, T>(v: T) {
  return new BaseEither<L, T>(EitherType.Right, v) as Either<L, T>;
}

export function left<T, R>(v: T) {
  return new BaseEither<T, R>(EitherType.Left, v) as Either<T, R>;
}

class BaseEither<L, R> implements Monad<R> {
  constructor(type: EitherType.Left, v: L);
  constructor(type: EitherType.Right, v: R);
  constructor(public readonly type: EitherType, public readonly value: L | R) {}

  isLeft(): this is LeftEither<L, R> {
    return this.type === EitherType.Left;
  }

  isRight(): this is RightEither<L, R> {
    return this.type === EitherType.Right;
  }

  join<L1, L2, R>(this: Either<L1, Either<L2, R>>): Either<L1 | L2, R> {
    return this.chain(x => x);
  }

  mapRight<T>(this: Either<L, R>, f: (r: R) => T): Either<L, T> {
    return this.map(f);
  }

  mapLeft<T>(this: Either<L, R>, f: (l: L) => T): Either<T, R> {
    if (this.isLeft()) {
      return left<T, R>(f(this.value));
    }
    return right<T, R>(this.value);
  }

  map<T>(this: Either<L, R>, f: (r: R) => T): Either<L, T> {
    if (this.isLeft()) {
      return left<L, T>(this.value);
    }
    return right<L, T>(f(this.value));
  }

  asyncMap<T>(this: Either<L, R>, f: (r: R) => Promise<T>): Promise<Either<L, T>> {
    if (this.isLeft()) {
      return Promise.resolve(left<L, T>(this.value));
    }
    return f(this.value).then(v => right<L, T>(v));
  }

  apply<A, B>(this: Either<L, (a: A) => B>, arg: Either<L, A>): Either<L, B>;
  apply<A, B>(this: Either<L, A>, fn: Either<L, (a: A) => B>): Either<L, B>;
  apply<A, B>(this: Either<L, A> | Either<L, (a: A) => B>, argOrFn: Either<L, A> | Either<L, (a: A) => B>): Either<L, B> {
    if (this.isLeft()) {
      return left<L, B>(this.value);
    }
    if (argOrFn.isLeft()) {
      return left<L, B>(argOrFn.value);
    }
    if (isWrappedFunction(this)) {
      return (argOrFn as Either<L, A>).map(this.value);
    }
    if (isWrappedFunction(argOrFn)) {
      return (argOrFn as Either<L, (a: A) => B>).apply(this);
    }
    throw new Error("Some of the arguments should be a function");
  }

  asyncApply<A, B>(
    this: Either<L, (a: Promise<A> | A) => Promise<B>>,
    arg: Either<L, Promise<A>>
  ): Promise<Either<L, B>>;
  asyncApply<A, B>(
    this: Either<L, Promise<A>>,
    fn: Either<L, Promise<(a: Promise<A> | A) => B>>
  ): Promise<Either<L, B>>;
  asyncApply<A, B>(
    this: Either<L, Promise<A>> | Either<L, (a: Promise<A> | A) => Promise<B>>,
    argOrFn:
      | Either<L, Promise<A>>
      | Either<L, (a: Promise<A> | A) => Promise<B>>
  ): Promise<Either<L, B>> {
    if (this.isLeft()) {
      return Promise.resolve(left<L, B>(this.value));
    }
    if (argOrFn.isLeft()) {
      return Promise.resolve(left<L, B>(argOrFn.value));
    }
    if (isWrappedFunction(this)) {
      return (argOrFn as Either<L, Promise<A>>).asyncMap(this.value);
    }
    if (isWrappedFunction(argOrFn)) {
      return (argOrFn as Either<L, (a: Promise<A> | A) => Promise<B>>).asyncApply(
        this
      );
    }
    throw new Error("Some of the arguments should be a function");
  }

  chain<A, B>(this: Either<L, R>, f: (r: R) => Either<A, B>): Either<A | L, B> {
    if (this.isLeft()) {
      return left<L, B>(this.value);
    }
    return f(this.value);
  }

  asyncChain<A, B>(
    this: Either<L, R>,
    f: (r: R) => Promise<Either<A, B>>
  ): Promise<Either<A | L, B>> {
    if (this.isLeft()) {
      return Promise.resolve(left<L, B>(this.value));
    }
    return f(this.value);
  }
}

type LeftEither<L, R> = BaseEither<L, R> & {
  readonly value: L,
  readonly type: EitherType.Left
}
type RightEither<L, R> = BaseEither<L, R> & {
  readonly value: R,
  readonly type: EitherType.Right
}

export type Either<L, R> = LeftEither<L, R> | RightEither<L, R>;
