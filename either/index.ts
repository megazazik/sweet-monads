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

export default class Either<L, R> implements Monad<R> {
  static mergeInOne<L1, R1>(values: [Either<L1, R1>]): Either<L1, [R1]>;
  static mergeInOne<L1, R1, L2, R2>(
    values: [Either<L1, R1>, Either<L2, R2>]
  ): Either<L1 | L2, [R1, R2]>;
  static mergeInOne<L1, R1, L2, R2, L3, R3>(
    values: [Either<L1, R1>, Either<L2, R2>, Either<L3, R3>]
  ): Either<L1 | L2 | L3, [R1, R2, R3]>;
  static mergeInOne<L1, R1, L2, R2, L3, R3, L4, R4>(
    values: [Either<L1, R1>, Either<L2, R2>, Either<L3, R3>, Either<L4, R4>]
  ): Either<L1 | L2 | L3 | L4, [R1, R2, R3, R4]>;
  static mergeInOne<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5>(
    values: [
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>
    ]
  ): Either<L1 | L2 | L3 | L4 | L5, [R1, R2, R3, R4, R5]>;
  static mergeInOne<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5, L6, R6>(
    values: [
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>,
      Either<L6, R6>
    ]
  ): Either<L1 | L2 | L3 | L4 | L5 | L6, [R1, R2, R3, R4, R5, R6]>;
  static mergeInOne<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5, L6, R6, L7, R7>(
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
  static mergeInOne<
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
  static mergeInOne<
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
  static mergeInOne<
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
  static mergeInOne(eithers: Array<Either<unknown, unknown>>) {
    return eithers.reduce(
      (res: Either<unknown, Array<unknown>>, v) =>
        v.chain(v => res.map(res => res.concat([v]))),
      Either.right<unknown, Array<unknown>>([])
    );
  }

  static merge = Either.mergeInOne;

  static mergeInMany<L1, R1>(values: [Either<L1, R1>]): Either<Array<L1>, [R1]>;
  static mergeInMany<L1, R1, L2, R2>(
    values: [Either<L1, R1>, Either<L2, R2>]
  ): Either<Array<L1 | L2>, [R1, R2]>;
  static mergeInMany<L1, R1, L2, R2, L3, R3>(
    values: [Either<L1, R1>, Either<L2, R2>, Either<L3, R3>]
  ): Either<Array<L1 | L2 | L3>, [R1, R2, R3]>;
  static mergeInMany<L1, R1, L2, R2, L3, R3, L4, R4>(
    values: [Either<L1, R1>, Either<L2, R2>, Either<L3, R3>, Either<L4, R4>]
  ): Either<Array<L1 | L2 | L3 | L4>, [R1, R2, R3, R4]>;
  static mergeInMany<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5>(
    values: [
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>
    ]
  ): Either<Array<L1 | L2 | L3 | L4 | L5>, [R1, R2, R3, R4, R5]>;
  static mergeInMany<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5, L6, R6>(
    values: [
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>,
      Either<L6, R6>
    ]
  ): Either<Array<L1 | L2 | L3 | L4 | L5 | L6>, [R1, R2, R3, R4, R5, R6]>;
  static mergeInMany<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5, L6, R6, L7, R7>(
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
  static mergeInMany<
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
  static mergeInMany<
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
  static mergeInMany<
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
  static mergeInMany(eithers: Array<Either<unknown, unknown>>) {
    return eithers.reduce(
      (
        res: Either<Array<unknown>, Array<unknown>>,
        v
      ): Either<Array<unknown>, Array<unknown>> => {
        if (res.isLeft()) {
          return v.isLeft() ? Either.left(res.value.concat([v.value])) : res;
        }
        return v.isLeft()
          ? Either.left([v.value])
          : (v.chain(v => res.map(res => [...res, v])) as Either<
              Array<unknown>,
              Array<unknown>
            >);
      },
      Either.right<Array<unknown>, Array<unknown>>([])
    );
  }

  static from<T>(v: T) {
    return this.right(v);
  }

  static right<L, T>(v: T) {
    return new Either<L, T>(EitherType.Right, v);
  }

  static left<T, R>(v: T) {
    return new Either<T, R>(EitherType.Left, v);
  }

  constructor(type: EitherType.Left, v: L);
  constructor(type: EitherType.Right, v: R);
  constructor(public readonly type: EitherType, public readonly value: L | R) {}

  isLeft() {
    return this.type === EitherType.Left;
  }

  isRight() {
    return this.type === EitherType.Right;
  }

  join<L1, L2, R>(this: Either<L1, Either<L2, R>>): Either<L1 | L2, R> {
    return this.chain(x => x);
  }

  mapRight<T>(f: (r: R) => T): Either<L, T> {
    return this.map(f);
  }

  mapLeft<T>(f: (l: L) => T): Either<T, R> {
    if (this.isLeft()) {
      return Either.left<T, R>(f(this.value as L));
    }
    return Either.right<T, R>(this.value as R);
  }

  map<T>(f: (r: R) => T): Either<L, T> {
    if (this.isLeft()) {
      return Either.left<L, T>(this.value as L);
    }
    return Either.right<L, T>(f(this.value as R));
  }

  asyncMap<T>(f: (r: R) => Promise<T>): Promise<Either<L, T>> {
    if (this.isLeft()) {
      return Promise.resolve(Either.left<L, T>(this.value as L));
    }
    return f(this.value as R).then(v => Either.right<L, T>(v));
  }

  apply<A, B>(this: Either<L, (a: A) => B>, arg: Either<L, A>): Either<L, B>;
  apply<A, B>(this: Either<L, A>, fn: Either<L, (a: A) => B>): Either<L, B>;
  apply<A, B>(this: Either<L, A> | Either<L, (a: A) => B>, argOrFn: Either<L, A> | Either<L, (a: A) => B>): Either<L, B> {
    if (this.isLeft()) {
      return Either.left<L, B>(this.value as L);
    }
    if (argOrFn.isLeft()) {
      return Either.left<L, B>(argOrFn.value as L);
    }
    if (isWrappedFunction(this)) {
      return (argOrFn as Either<L, A>).map(this.value as (a: A) => B);
    }
    if (isWrappedFunction(argOrFn)) {
      return (argOrFn as Either<L, (a: A) => B>).apply(this as Either<L, A>);
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
      return Promise.resolve(Either.left<L, B>(this.value as L));
    }
    if (argOrFn.isLeft()) {
      return Promise.resolve(Either.left<L, B>(argOrFn.value as L));
    }
    if (isWrappedFunction(this)) {
      return (argOrFn as Either<L, Promise<A>>).asyncMap(this.value as (
        a: A | Promise<A>
      ) => Promise<B>);
    }
    if (isWrappedFunction(argOrFn)) {
      return (argOrFn as Either<L, (a: Promise<A> | A) => Promise<B>>).asyncApply(
        this as Either<L, Promise<A>>
      );
    }
    throw new Error("Some of the arguments should be a function");
  }

  chain<A, B>(f: (r: R) => Either<A, B>): Either<A | L, B> {
    if (this.isLeft()) {
      return Either.left<L, B>(this.value as L);
    }
    return f(this.value as R);
  }

  asyncChain<A, B>(
    f: (r: R) => Promise<Either<A, B>>
  ): Promise<Either<A | L, B>> {
    if (this.isLeft()) {
      return Promise.resolve(Either.left<L, B>(this.value as L));
    }
    return f(this.value as R);
  }
}
