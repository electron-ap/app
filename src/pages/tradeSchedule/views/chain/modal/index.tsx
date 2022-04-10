import { createContainer } from 'unstated-next'
import { useState } from 'react'

function useSchedulerChains() {
  return useState<Array<any>>([])
}

export let SchedulerChainModal = createContainer(useSchedulerChains)
