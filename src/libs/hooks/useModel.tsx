import { Modal } from 'antd'
import { useEffect, ReactNode } from 'react'
import ReactDOM from 'react-dom'

class DiyModel {
  expId: string
  private element: ReactNode | undefined
  private container: HTMLElement | undefined
  constructor(expId: string) {
    this.expId = expId
  }
  render(element: ReactNode, container: HTMLElement, ...dialogProps: any[]) {
    console.log(13, element)
    this.setMeta(element, container)
    ReactDOM.render(
      (
        <Modal
          visible={true}
          footer={null}
          {...dialogProps}
          onCancel={this.dispose.bind(this)}
        >
          {this.element}
        </Modal>
      ) as any,
      this.container as any,
    )
  }
  setMeta(element: ReactNode, container: HTMLElement) {
    this.element = element
    this.container = container
  }
  dispose() {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(this.container!)
    }, 10)
  }
}

export const gDiyModelMap = new Map<string, DiyModel>()

export const useModel = (modelId: number | string) => {
  const expId = modelId.toString()
  let existedModel = gDiyModelMap.get(expId)
  if (!existedModel) {
    existedModel = new DiyModel(expId)
    gDiyModelMap.set(expId, existedModel)
  }
  return existedModel
}

export const useUnmountModel = (experimentId: string) => {
  useEffect(() => {
    return () => {
      const existedModel = gDiyModelMap.get(experimentId)
      if (existedModel) {
        existedModel.dispose()
        gDiyModelMap.delete(experimentId)
      }
    }
  }, [experimentId])
}
