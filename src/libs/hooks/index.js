import { useRef, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
// import { useParamsContext } from "../context/paramsProvider";
// import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import set from 'lodash/set'
import message from 'antd/lib/message'

export const useBackground = (color) => {
  const defaultBg = '#fff'
  useEffect(() => {
    document.body.style.background = color
    return () => {
      document.body.style.background = defaultBg
    }
  }, [color])
}

export const useMountedRef = () => {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    return () => (isMounted.current = false)
  }, [])

  return isMounted
}

// 文档：https://react-query.tanstack.com/reference/useQuery#_top
export const useListQuery = ({ queryKey, api }, dependencies) => {
  // const { setParams } = useParamsContext();
  // const queryClient = useQueryClient();

  return useQuery(
    [queryKey, dependencies],
    () => {
      const controller = new AbortController()
      const signal = controller.signal
      const promise = api(dependencies, signal)
      // Cancel the request if React Query calls the `promise.cancel` method
      promise.cancel = () => controller.abort()
      return promise
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
      // enabled: !isEmpty(dependencies),
      onError: (error) => {
        // setParams(null);
        // queryClient.removeQueries([queryKey, dependencies], { exact: true });
      },
    },
  )
}

export const useDeleteMutation = ({ queryKey, api, itemKey }, dependencies) => {
  return useMutation(
    (apiParams) => api(apiParams),
    useCallBack([queryKey, dependencies], (target, old) => {
      const arr = get(old, ['data', 'data'], [])
      set(
        old,
        ['data', 'data'],
        arr.filter((item) => item[itemKey] !== target[itemKey]),
      )
      return old
    }),
  )
}

export const useUpdateMutation = ({ queryKey, api, itemKey }, dependencies) => {
  return useMutation(
    (apiParams) => api(apiParams),
    useCallBack([queryKey, dependencies], (target, old) => {
      old.data = old.data?.data?.map((item) =>
        item[itemKey] === target[itemKey] ? { ...item, ...target } : item,
      )
      return old
    }),
  )
}

const useCallBack = (queryKey, callback) => {
  debugger
  const queryClient = useQueryClient()
  return {
    onMutate: async (variables) => {
      debugger
      await queryClient.cancelQueries(queryKey)
      const previousItems = cloneDeep(queryClient.getQueryData(queryKey))
      queryClient.setQueryData(queryKey, (old) => callback(variables, old))
      return { previousItems }
    },
    onSettled: (data, error, variables, context) => {
      debugger
      if (error) {
        queryClient.setQueryData(queryKey, context.previousItems)
        message.error(data.msg)
      }
      // else {
      //   queryClient.invalidateQueries(queryKey);
      // }
      // Error or success... doesn't matter!
    },
  }
}
