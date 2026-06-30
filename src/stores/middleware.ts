// import { configureScope } from '@sentry/browser';
// import type { StateCreator, StoreMutatorIdentifier } from 'zustand';

// type PopArgument<T extends (...a: never[]) => unknown> = T extends (
//   ...a: [...infer A, infer _]
// ) => infer R
//   ? (...a: A) => R
//   : never;

// interface SentryMiddlewareConfig<T> {
//   stateTransformer?: (state: T) => object;
// }

// type SentryMiddleware = <
//   T extends object,
//   Mps extends [StoreMutatorIdentifier, unknown][] = [],
//   Mcs extends [StoreMutatorIdentifier, unknown][] = [],
// >(
//   f: StateCreator<T, Mps, Mcs>,
//   config?: SentryMiddlewareConfig<T>,
// ) => StateCreator<T, Mps, Mcs>;

// type SentryMiddlewareImpl = <T extends object>(
//   f: PopArgument<StateCreator<T>>,
//   config?: SentryMiddlewareConfig<T>,
// ) => PopArgument<StateCreator<T>>;

// const baseSentryMiddleware: SentryMiddlewareImpl = (config, sentryConfig) => (set, get, api) =>
//   config(
//     (...args) => {
//       set(...args);
//       const newState = get();
//       configureScope((scope) => {
//         const transformedState = sentryConfig?.stateTransformer
//           ? sentryConfig.stateTransformer(newState)
//           : newState;

//         scope.setContext('state', {
//           state: {
//             type: 'zustand',
//             value: transformedState,
//           },
//         });
//       });
//     },
//     get,
//     api,
//   );

// const sentryMiddleware = baseSentryMiddleware as unknown as SentryMiddleware;

// export default sentryMiddleware;
