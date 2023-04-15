export const debounce = (func: any) => {
  let timer: any
  return function (...args: any[]) {
    const context = this
    if (timer !== null) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      func.apply(context, args)
    }, 500)
  }
}
