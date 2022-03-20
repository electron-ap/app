declare namespace GraphOperate {
  type optType = 'undo' | 'save' | 'share' | 'upload'

  type optImplType = {
    [v in optType]: () => void
  }
}
