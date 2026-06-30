/* eslint-disable react-hooks/rules-of-hooks */
import {
  MutateFunction,
  QueryFunction,
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export default function useRequestProcessor() {
  const queryClient = useQueryClient();

  function query<T>(key: QueryKey, queryFunction: QueryFunction<T, QueryKey>, options = {}) {
    return useQuery<T>({
      queryKey: key,
      queryFn: queryFunction,
      ...options,
    });
  }

  function mutate<T>(key: QueryKey, mutationFunction?: MutateFunction<T, QueryKey>, options = {}) {
    return useMutation<T>({
      mutationKey: key,
      mutationFn: mutationFunction,
      onSettled: () => queryClient.invalidateQueries(key),
      ...options,
    });
  }

  return { query, mutate };
}
