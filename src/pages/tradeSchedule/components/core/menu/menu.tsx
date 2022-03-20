import { DragSource, ConnectDragPreview, ConnectDragSource } from 'react-dnd'
import { DRAGGABLE_ALGO_COMPONENT } from 'libs/constants/graph'

const InnerJsx = (props: Props) => {
  const { node, icon, connectDragPreview, connectDragSource } = props
  const { name, label, ...rest } = node
  return (
    <>
      {connectDragPreview(
        connectDragSource(
          <div className={(label ? 'module' : 'normal') + ' basic'}>
            <img alt={name} src={icon} {...rest} />
            <p>{label}</p>
          </div>,
        ),
      )}
    </>
  )
}

interface Props {
  node: any
  icon: any
  isDragging: boolean
  connectDragSource: ConnectDragSource
  connectDragPreview: ConnectDragPreview
}
export const DragJsx = DragSource(
  DRAGGABLE_ALGO_COMPONENT,
  {
    beginDrag: (props: Props) => ({ component: props.node }),
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }),
)(InnerJsx)

export default DragJsx
