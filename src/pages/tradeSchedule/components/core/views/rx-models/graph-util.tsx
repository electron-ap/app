import { sortBy } from 'lodash-es'
import { NODE_WIDTH, NODE_HEIGHT } from 'libs/constants/graph'
import { NExperimentGraph } from '../../views/rx-models/typing'
import '../common/graph-common/connector'

// 格式化单个节点，新增节点时复用
export function formatNodeInfoToNodeMeta(
  nodeData: NExperimentGraph.Node,
  inputPortConnectedMap: { [k: string]: boolean } = {},
) {
  const portItems: any[] = []
  const { id, name, positionX, positionY, inPorts, outPorts } = nodeData
  sortBy(inPorts, 'sequence').forEach((inPort: any) => {
    portItems.push({
      ...inPort,
      group: 'in',
      id: inPort.id.toString(),
      connected: !!inputPortConnectedMap[inPort.id.toString()],
    })
  })
  sortBy(outPorts, 'sequence').forEach((outPort: any) => {
    portItems.push({
      ...outPort,
      group: 'out',
      id: outPort.id.toString(),
      connected: !!inputPortConnectedMap[outPort.id.toString()],
    })
  })
  const x = positionX || 0
  const y = positionY || 0
  return {
    ...nodeData,
    x,
    y,
    type: name || 'node',
    id: id!.toString(),
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
    data: {
      ...nodeData,
      type: name || 'node',
      x,
      y,
      id: id!.toString(),
    },
    ports: {
      items: portItems,
    },
    zIndex: 10,
  }
}

// 将接口返回的图信息转换为图渲染引擎可渲染的信息
export function formatGraphData(
  graphData: NExperimentGraph.ExperimentGraph = {} as any,
) {
  const { nodes = [], links = [] } = graphData
  // 格式化边
  const formattedEdges = links.map((link: NExperimentGraph.Link) => {
    const { source, outputPortId, target, inputPortId } = link
    return {
      ...link,
      data: { ...link },
      sourceAnchor: 'bottom',
      source: {
        cell: source.toString(),
        port: outputPortId.toString(),
        anchor: {
          name: 'bottom',
        },
      },
      target: {
        cell: target.toString(),
        port: inputPortId.toString(),
        anchor: {
          name: 'center',
        },
      },
      label: '',
      zIndex: 1,
    }
  })

  // 记录所有已连线的输入桩
  const inputPortConnectedMap = formattedEdges.reduce(
    (acc: { [k: string]: boolean }, edge: any) => {
      acc[edge.inputPortId] = true
      return acc
    },
    {} as { [k: string]: boolean },
  )

  // 格式化算法组件节点
  const formattedNodes = nodes.map((nodeData: NExperimentGraph.Node) =>
    formatNodeInfoToNodeMeta(nodeData, inputPortConnectedMap),
  )

  return {
    nodes: [...formattedNodes],
    edges: formattedEdges,
  }
}
