declare namespace operateType {
  type intActionImpl<T extends string> = {
    [v in T]: Function
  }

  type optAction<T> = {
    code: T
    name: string
    type?: ButtonType
    [v: string]: unknown
  }
}
