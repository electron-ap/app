import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { BehaviorSubject, fromEventPattern, Subscription } from 'rxjs'
import { filter, take } from 'rxjs/operators'
import { round } from 'lodash-es'
import produce from 'immer'
import { ConfigProvider, message, Tooltip } from 'antd'
import { RERENDER_EVENT } from 'libs/constants/graph'
import { GraphCore, ConnectionRemovedArgs } from './graph-core'
import { BaseNode, X6DemoNode } from '../common/graph-common/shape/node'
import {
  BaseEdge,
  GuideEdge,
  X6DemoGroupEdge,
} from '../common/graph-common/shape/edge'
import { NodeElement } from '../dag-canvas/elements/node-element'
import { NExecutionStatus, NExperiment, NExperimentGraph } from './typing'
import {
  // expandGroupAccordingToNodes,
  formatGraphData,
  formatNodeInfoToNodeMeta,
} from './graph-util'
import { addNode, copyNode } from '../../mock/graph'

type NodeMeta = ReturnType<typeof formatGraphData>['nodes'][number]

type EdgeMeta = ReturnType<typeof formatGraphData>['edges'][number]

class ExperimentGraph extends GraphCore<BaseNode, BaseEdge> {
  // 重新声明边的元信息的类型
  edgeMetas?: EdgeMeta[]

  // 等待渲染的节点，由于初次渲染 group 时需要 group 内的节点和边都渲染完成，因此放到 afterLayout 里面渲染 group
  pendingNodes: BaseNode[] = []

  // 实验 id
  experimentId: string

  // 是否是新增 / 编辑
  type: string | undefined

  // 实验图加载状态
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  // 实验数据
  experiment$: BehaviorSubject<NExperiment.Experiment> =
    new BehaviorSubject<NExperiment.Experiment>(null as any)

  // 实验图数据
  experimentGraph$: BehaviorSubject<NExperimentGraph.ExperimentGraph> =
    new BehaviorSubject<NExperimentGraph.ExperimentGraph>(null as any)

  // 当前选中节点
  activeNodeInstance$: BehaviorSubject<NExecutionStatus.ActiveNode> =
    new BehaviorSubject<NExecutionStatus.ActiveNode>(null as any)

  // 图数据的订阅
  experimentGraphSub?: Subscription

  // 主动触发的重新渲染订阅
  reRenderSub?: Subscription

  constructor(expId: string) {
    super({
      history: true,
      frozen: true,
      selecting: {
        enabled: true,
        rubberband: false,
        multiple: true,
        strict: true,
        showNodeSelectionBox: false,
        selectNodeOnMoved: false,
      },
      keyboard: {
        enabled: true,
      },
      connecting: {
        snap: { radius: 10 },
        allowBlank: false,
        highlight: true,
        connector: 'smooth',
        sourceAnchor: 'bottom',
        targetAnchor: 'center',
        connectionPoint: 'anchor',
        createEdge() {
          return new GuideEdge({
            attrs: {
              line: {
                strokeDasharray: '5 5',
                stroke: '#808080',
                strokeWidth: 1,
                targetMarker: {
                  name: 'block',
                  args: {
                    size: '6',
                  },
                },
              },
            },
          })
        },
        validateEdge: (args) => {
          const { edge } = args
          return !!(edge?.target as any)?.port
        },
        // 是否触发交互事件
        validateMagnet({ magnet }) {
          return magnet.getAttribute('port-group') !== 'in'
        },
        // 显示可用的链接桩
        validateConnection({
          sourceView,
          targetView,
          sourceMagnet,
          targetMagnet,
        }) {
          // 不允许连接到自己
          if (sourceView === targetView) {
            return false
          }

          // 只能从输出链接桩创建连接
          if (
            !sourceMagnet ||
            sourceMagnet.getAttribute('port-group') === 'in'
          ) {
            return false
          }

          // 只能连接到输入链接桩
          if (
            !targetMagnet ||
            targetMagnet.getAttribute('port-group') !== 'in'
          ) {
            return false
          }

          // 判断目标链接桩是否可连接
          const portId = targetMagnet.getAttribute('port')!
          const node = targetView!.cell as X6DemoNode
          const port = node.getPort(portId)
          return !(port && port.connected)
        },
      },
      scroller: {
        enabled: true,
        pageVisible: false,
        pageBreak: false,
        pannable: true,
      },
      highlighting: {
        nodeAvailable: {
          name: 'className',
          args: {
            className: 'available',
          },
        },
        magnetAvailable: {
          name: 'className',
          args: {
            className: 'available',
          },
        },
        magnetAdsorbed: {
          name: 'className',
          args: {
            className: 'adsorbed',
          },
        },
      },
      onPortRendered(args) {
        const { port } = args
        const { contentSelectors } = args
        const container = contentSelectors && contentSelectors.content

        const placement = port.group === 'in' ? 'top' : 'bottom'

        if (container) {
          ReactDOM.render(
            (
              <ConfigProvider prefixCls={'ant'}>
                <Tooltip
                  title={(port as any).description}
                  placement={placement}
                >
                  <span
                    className={classnames('ais-port', {
                      connected: (port as any).connected,
                    })}
                  />
                </Tooltip>
              </ConfigProvider>
            ) as any,
            container as any,
          )
        }
      },
    })
    this.experimentId = expId
    this.initialize()
  }

  // 获取实验和图及执行状态信息
  async initialize() {
    const graphRes = {
      nodes: [],
      links: [],
    }
    this.experimentGraph$.next(graphRes as any)
  }

  // 切换实验
  async changeExperiment(id: string, node: any, type: string = '') {
    this.experimentId = id
    this.type = type
    this.experimentGraph$.next(node)
  }

  // 更新图元
  async updateExperimentGraph(
    nodes: NExperimentGraph.Node[] = [],
    links: NExperimentGraph.Link[] = [],
  ) {
    const oldGraph = this.experimentGraph$.getValue()
    const newGraph = produce(oldGraph, (nextGraph: any) => {
      if (nodes.length) {
        nextGraph.nodes.push(...nodes)
      }
      if (links.length) {
        nextGraph.links.push(...links)
      }
    })
    this.experimentGraph$.next(newGraph as any)
  }
  // 删除图元
  async delExperimentGraphElement(
    nodes: string[] = [],
    links: NExperimentGraph.Link[] = [],
  ) {
    const oldGraph = this.experimentGraph$.getValue()
    const newGraph = produce(oldGraph, (nextGraph: any) => {
      if (nodes.length) {
        nextGraph.nodes = oldGraph.nodes.filter(
          (node) => !nodes.includes(node.id.toString()),
        )
        nextGraph.links = oldGraph.links.filter(
          (link) =>
            !nodes.find((node) =>
              [link.source.toString(), link.target.toString()].includes(node),
            ),
        )
      } else {
        nextGraph.links = oldGraph.links.filter((link) => {
          return !links.find((delLink) => {
            return (
              delLink.inputPortId.toString() === link.inputPortId.toString() &&
              delLink.outputPortId.toString() === link.outputPortId.toString()
            )
          })
        })
      }
    })
    this.experimentGraph$.next(newGraph as any)
  }

  // 判断画布是否准备完成（主要用于 react 组件中）
  isGraphReady() {
    return !!this.graph
  }

  // 渲染画布
  renderGraph = (wrapper: HTMLElement, container: HTMLElement) => {
    this.experimentGraphSub = this.experimentGraph$
      .pipe(
        filter((x) => !!x), // 过滤出有效数据
        take(1), // 只做一次挂载渲染
      )

      .subscribe((graphData) => {
        if (!this.graph || this.type !== 'add') {
          this.appendOption = {
            scroller: {
              enabled: this.type !== 'normal',
              pageVisible: false,
              pageBreak: false,
              pannable: this.type !== 'normal',
            },
          }
          const { nodes, edges } = formatGraphData(graphData)
          super.render({
            wrapper,
            container,
            nodes,
            edges,
          })
        }
      })

    // 监听主动触发的重新渲染事件，避免从 IDE 返回后画布消失
    this.reRenderSub = fromEventPattern(
      (handler) => {
        window.addEventListener(RERENDER_EVENT, handler)
      },
      (handler) => {
        window.removeEventListener(RERENDER_EVENT, handler)
      },
    ).subscribe(this.handlerResize as any)
  }
  renderNode(nodeMeta: NodeMeta): BaseNode | undefined {
    const { experimentId } = this
    const { data } = nodeMeta
    const { type } = data as any
    if (!type) {
      return undefined
    }
    if (type === 'basic') {
      const node = this.graph!.addNode(
        new X6DemoNode({
          ...nodeMeta,
          shape: 'ais-rect-port',
          component: (
            <NodeElement
              nodeId={data.id || ''}
              initialValues={data.initialValues}
              experimentId={experimentId}
            />
          ),
        }),
      ) as BaseNode
      if ((nodeMeta.data as any).hide) {
        this.pendingNodes.push(node)
      }
      return node
    }
  }

  afterLayout() {
    super.afterLayout()
    this.pendingNodes.forEach((node) => {
      node.hide()
    })
    this.pendingNodes = []
  }

  renderEdge(edgeMeta: EdgeMeta): BaseEdge | undefined {
    const { type } = edgeMeta
    if (type === 'group') {
      return this.graph!.addEdge(new X6DemoGroupEdge(edgeMeta)) as BaseEdge
    }
    return this.graph!.addEdge(new GuideEdge(edgeMeta)) as BaseEdge
  }

  validateContextMenu = (info: NExperimentGraph.ContextMenuInfo): boolean => {
    return !(
      info.type === 'edge' && (info?.data?.edge as BaseEdge)?.isGroupEdge()
    )
  }

  handlerResize = (e: CustomEvent<string>) => {
    if (e.detail === this.experimentId) {
      this.resizeGraph()
    }
  }

  async onConnectNode(args: any) {
    const { edge = {}, isNew } = args
    const { source, target } = edge as any
    if (isNew) {
      // 处理边虚线样式更新的问题。
      const node = args.currentCell as BaseNode
      const portId = edge.getTargetPortId()
      if (node && portId) {
        // 触发 port 重新渲染
        node.setPortProp(portId, 'connected', true)
        // 更新连线样式
        edge.attr({
          line: {
            strokeDasharray: '',
            targetMarker: '',
            stroke: '#808080',
          },
        })
        const data = {
          source: source.cell,
          target: target.cell,
          outputPortId: source.port,
          inputPortId: target.port,
        }
        edge.setData(data)
        this.updateExperimentGraph([], [data])
      }
    }

    return { success: true }
  }

  // eslint-disable-next-line class-methods-use-this
  onConnectionRemoved(args: ConnectionRemovedArgs) {
    try {
      const { edge } = args
      const { target } = edge
      const { cell: nodeId, port: portId } = target as any
      if (nodeId) {
        const targetCell = this.getNodeById(nodeId)!
        if (targetCell) {
          // 触发 port 重新渲染
          targetCell.setPortProp(portId, 'connected', false)
        }
      }
    } catch (error) {
      console.warn(error)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  onMoveNodeStart(args: any) {
    // const { node }: { node: BaseNode } = args
    // const parent = node.getParent()
    // const parentData = parent?.getData<any>()
    // if (parentData && !parentData?.isCollapsed) {
    //   expandGroupAccordingToNodes({ moveNodes: [node] })
    // }
  }

  async onMoveNodes(movedNodes: any[]) {
    const targetNodes = movedNodes.filter((arg) => {
      const { node } = arg
      return !node.isGroup()
    })
    if (targetNodes?.length) {
      const newPos = targetNodes.map((moveNode: any) => {
        const { current, node } = moveNode
        const { x, y } = current
        const { id } = node
        this.updateNodeById(id, (node?: BaseNode) => {
          node!.setData({ x, y })
        })
        return {
          nodeInstanceId: id,
          posX: round(x),
          posY: round(y),
        }
      })
      const oldGraph = this.experimentGraph$.getValue()
      const newGraph = produce(oldGraph, (nextGraph: any) => {
        newPos.forEach((position) => {
          const { nodeInstanceId, posX, posY } = position
          const matchNode = nextGraph.nodes.find(
            (item: any) => item.id.toString() === nodeInstanceId.toString(),
          )
          if (matchNode) {
            matchNode.positionX = posX
            matchNode.positionY = posY
          }
        })
      })
      this.experimentGraph$.next(newGraph)
    }
  }

  onDeleteNodeOrEdge(args: { nodes: BaseNode[]; edges: GuideEdge[] }) {
    const { nodes, edges } = args
    const normalNodes: X6DemoNode[] = nodes.filter(
      (node) => !node.isGroup(),
    ) as X6DemoNode[]
    if (normalNodes?.length) {
      this.requestDeleteNodes(normalNodes.map((node) => node.id))
    }
    if (edges?.length) {
      this.requestDeleteEdges(edges)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  validateNodeCopyable(cell: BaseNode) {
    return cell?.isNode() && !cell!.isGroup()
  }

  // eslint-disable-next-line consistent-return
  onCopyNode(node: X6DemoNode) {
    try {
      const nodeData = node.getData<any>()
      const res = copyNode(nodeData)
      const newNode = formatNodeInfoToNodeMeta(res as any)
      this.addNode(newNode)
      this.clearContextMenuInfo()
    } catch (error) {
      message.error('复制节点失败，请重试')
    }
  }

  // 设置自定义组件节点
  setActiveAlgoData = (data: any) => {
    if (!data) {
      this.activeNodeInstance$.next(null as any)
      return
    }
    const oldData = this.activeNodeInstance$.getValue()
    this.activeNodeInstance$.next({ ...oldData, ...data }) // 完成两种格式的融合，数据结构更复杂以后，这一句可以变成一个专门的方法
  }

  // 发起请求增加节点
  requestAddNode = async (param: {
    nodeMeta: any
    clientX: number
    clientY: number
  }) => {
    // eslint-disable-next-line: no-this-assignment
    const { graph } = this
    if (graph) {
      const { nodeMeta, clientX, clientY } = param
      const pos = graph.clientToLocal(clientX, clientY)
      const nodeRes = await addNode({ ...nodeMeta, ...pos })
      this.updateExperimentGraph([nodeRes])
      const newNode = formatNodeInfoToNodeMeta(nodeRes as any)
      this.addNode(newNode)
      return { success: true }
    }
    return { success: false } as any
  }

  // 发起请求删除节点
  requestDeleteNodes = async (ids: string[] | string) => {
    const nodeInstanceIds = ([] as string[]).concat(ids)
    if (this.graph && nodeInstanceIds.length) {
      this.deleteNodes(nodeInstanceIds)
      this.clearContextMenuInfo()
      // 如果被选中节点中包含当前打开的配置面板的节点，则取消激活
      const activeNodeInstance = this.activeNodeInstance$.getValue()
      if (
        activeNodeInstance &&
        nodeInstanceIds
          .map((i) => i.toString())
          .includes(activeNodeInstance.id.toString())
      ) {
        this.activeNodeInstance$.next(null as any)
      }
      this.delExperimentGraphElement(nodeInstanceIds, [])
      return { success: true }
    }
    return { success: false }
  }

  // 发起请求删除边
  requestDeleteEdges = async (edges: BaseEdge | BaseEdge[]) => {
    const targetEdges: BaseEdge[] = ([] as any[]).concat(edges)
    this.deleteEdges(targetEdges)
    this.delExperimentGraphElement(
      [],
      targetEdges.map((cell) => cell.getData()),
    )
    return { success: true }
  }

  // 撤销删除节点
  undoDeleteNode = async () => {
    this.undo()
  }

  // 更新节点数据
  updateNodeData = async (nodeInstanceId: string, initialValues: object) => {
    const oldGraph = this.experimentGraph$.getValue()
    const newGraph = produce(oldGraph, ({ nodes, links }: any) => {
      if (nodes.length) {
        nodes.forEach((item: NExperimentGraph.Node) => {
          if (item.id === nodeInstanceId) {
            item.initialValues = initialValues
          }
        })
      }
    })

    this.experimentGraph$.next(newGraph as any)
  }

  // 缩放特定比例
  zoomGraph = (factor: number) => {
    this.zoom(factor)
  }

  // 缩放到适应画布
  zoomGraphToFit = () => {
    this.zoom('fit')
  }

  // 缩放到实际尺寸
  zoomGraphRealSize = () => {
    this.zoom('real')
  }

  dispose() {
    this.experimentGraphSub?.unsubscribe()
    this.reRenderSub?.unsubscribe()
    super.dispose()
  }
}

export const gModelMap = new Map<string, ExperimentGraph>() // 存储实验图的 model

export const useExperimentGraph = (experimentId: number | string) => {
  const expId = experimentId.toString()
  let existedExperimentGraph = gModelMap.get(expId)
  if (!existedExperimentGraph) {
    existedExperimentGraph = new ExperimentGraph(expId)
    gModelMap.set(expId, existedExperimentGraph)
  }
  return existedExperimentGraph
}

export const useUnmountExperimentGraph = (experimentId: string) => {
  useEffect(() => {
    return () => {
      const existedExperimentGraph = gModelMap.get(experimentId)
      if (existedExperimentGraph) {
        existedExperimentGraph.dispose()
        gModelMap.delete(experimentId)
      }
    }
  }, [experimentId])
}
