import { createContainer } from 'unstated-next'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export interface chainsParamsType {
  name?: string
  producetName?: string
}

function useChainParams() {
  let [searchParams] = useSearchParams()
  const initialState: chainsParamsType = {
    name: searchParams.get('name') || '',
    producetName: searchParams.get('producetName') || '',
  }
  let [chainParams, setChainParams] = useState<chainsParamsType>(initialState)
  let addChainParams = (params: chainsParamsType) => setChainParams(params)
  return { chainParams, addChainParams }
}

export let ChainModal = createContainer(useChainParams)
