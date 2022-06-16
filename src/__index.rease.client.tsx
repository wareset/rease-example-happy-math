/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  _t as _t3,
  _e as _e8,
  _ul as _ul21,
  _$ as _$1,
  _x as _x2,
  _c as _c7,
  _s as _s10
} from 'rease';
// import * as rease from 'rease'
// console.log(rease)

import type { TypeReaseContext } from 'rease'

// @ts-ignore
import logo2 from './logo2.svg'
const logobg = `center / contain no-repeat url("data:image/svg+xml;utf8, ${logo2}") #3A6C51`

import { createReaseApp } from 'rease'
import { $innerWidth, $innerHeight } from 'rease'
import { store, subscribe, context, storablefySafeAllWithProxy } from 'rease'

const reflow = (element: HTMLElement): any => element.offsetHeight

const { random: randomDefault, round } = Math

const random = (): number => randomDefault() || random()
const randomTo = (min: number, max: number): number =>
  round(random() * (max - min) + min)

const fnSumFactory = (max: number) => (): [string, string] => {
  const n1 = randomTo(0, max)
  const n2 = randomTo(0, max)
  return [`${n1} + ${n2}`, (n1 + n2).toString()]
}
const fnDifFactory = (max: number) => (): [string, string] => {
  let n1 = randomTo(0, max)
  let n2 = randomTo(0, max)
  if (n1 < n2) [n1, n2] = [n2, n1]
  return [`${n1} − ${n2}`, (n1 - n2).toString()]
}
const fnSumOrDifFactory = (max: number) => (): [string, string] => {
  let n1 = randomTo(0, max)
  let n2 = randomTo(0, max)
  if (random() > 0.5) {
    return [`${n1} + ${n2}`, (n1 + n2).toString()]
  } else {
    if (n1 < n2) [n1, n2] = [n2, n1]
    return [`${n1} − ${n2}`, (n1 - n2).toString()]
  }
}

const fnSumOrDifFactoryAdv = (max: number) => (): [string, string] => {
  const n1 = randomTo(0, max)
  const n2 = randomTo(0, max)
  if (random() > 0.5) {
    return [`${n1} + ${n2}`, (n1 + n2).toString()]
  } else {
    return [`${n1} − ${n2}`, (n1 - n2).toString()]
  }
}

const fnMulFactory = (max: number) => (): [string, string] => {
  const n1 = randomTo(0, max)
  const n2 = randomTo(0, max)
  return [`${n1} × ${n2}`, (n1 * n2).toString()]
}

const fnMulFactoryAdv = (max: number, val: number) => (): [string, string] => {
  const n1 = randomTo(0, max)
  return [`${n1} × ${val}`, (n1 * val).toString()]
}

const fnDivFactory = (max: number) => (): [string, string] => {
  const n1 = randomTo(0, max)
  const n2 = randomTo(1, max)
  return [`${n1 * n2} ÷ ${n2}`, n1.toString()]
}

const fnDivFactoryAdv = (max: number, val: number) => (): [string, string] => {
  const n1 = randomTo(0, max)
  return [`${n1 * val} ÷ ${val}`, n1.toString()]
}

const fnChainFactory = (max: number) => (): [string, string] => {
  let n = randomTo(0, max)
  let res = n, txt = '' + n

  n = randomTo(0, max)
  if (n > res || random() > 0.5) {
    res += n, txt += ' + ' + n
  } else {
    res -= n, txt += ' - ' + n
  }

  n = randomTo(0, max)
  if (n > res || random() > 0.5) {
    res += n, txt += ' + ' + n
  } else {
    res -= n, txt += ' - ' + n
  }

  if (random() > 0.5) {
    n = randomTo(0, max)
    if (n > res || random() > 0.5) {
      res += n, txt += ' + ' + n
    } else {
      res -= n, txt += ' - ' + n
    }
  }

  return [txt, res.toString()]
}

const fnChainBracketsFactory = (max: number) => (): [string, string] => {
  let n = randomTo(10, max)
  let res = n, txt = '' + n

  n = randomTo(0, max)
  if (n > res) {
    res = n - res, txt = '(' + n + ' - ' + txt + ')'
  } else {
    res -= n, txt = '(' + txt + ' - ' + n + ')'
  }

  n = randomTo(0, max)
  if (random() > 0.5) {
    n += res
    res = n - res, txt = n + ' - ' + txt
  } else {
    res += n
    if (random() > 0.5) txt += ' + ' + n
    else txt = n + ' + ' + txt
  }

  if (random() > 0.5) {
    n = randomTo(0, max)
    if (random() > 0.5) {
      n += res
      txt = '(' + txt + ')'
      res = n - res, txt = n + ' - ' + txt
    } else {
      res += n
      if (random() > 0.5) txt += ' + ' + n
      else txt = n + ' + ' + txt
    }
  }

  return [txt, res.toString()]
}

const SCHEMA = [
  {
    head : 'Первый',
    tasks: [
      {
        title: 'Сложение чисел до 10',
        fn   : fnSumFactory(10)
      },
      {
        title: 'Вычитание чисел до 10',
        fn   : fnDifFactory(10)
      },
      {
        title: 'Сложение и вычитание чисел до 10',
        fn   : fnSumOrDifFactory(10)
      },

      { title: '' },

      {
        title: 'Сложение чисел до 20',
        fn   : fnSumFactory(20)
      },
      {
        title: 'Вычитание чисел до 20',
        fn   : fnDifFactory(20)
      },
      {
        title: 'Сложение и вычитание чисел до 20',
        fn   : fnSumOrDifFactory(20)
      },

      { title: '' },

      {
        title: 'Цепочки чисел до 20',
        fn   : fnChainFactory(20)
      },
      {
        title: 'Цепочки чисел до 20 (со скобками)',
        fn   : fnChainBracketsFactory(20)
      },

      { title: '' },

      {
        title: 'Сложение чисел до 50',
        fn   : fnSumFactory(50)
      },
      {
        title: 'Вычитание чисел до 50',
        fn   : fnDifFactory(50)
      },
      {
        title: 'Сложение и вычитание чисел до 50',
        fn   : fnSumOrDifFactory(50)
      },

      { title: '' },

      {
        title: 'Цепочки чисел до 50',
        fn   : fnChainFactory(50)
      },
      {
        title: 'Цепочки чисел до 50 (со скобками)',
        fn   : fnChainBracketsFactory(50)
      },

      { title: '' },

      {
        title: 'Сложение и вычитание чисел до 100',
        fn   : fnSumOrDifFactory(100)
      },
      {
        title: 'Сложение и вычитание чисел до 1000',
        fn   : fnSumOrDifFactory(1000)
      },
      {
        title: 'Сложение и вычитание чисел до 10000',
        fn   : fnSumOrDifFactory(10000)
      },
    ]
  },
  {
    head : 'Второй',
    tasks: [
      {
        title: 'Умножение чисел (Таблица умножения)',
        fn   : fnMulFactory(10)
      },
      {
        title: 'Деление чисел (Таблица умножения)',
        fn   : fnDivFactory(10)
      },
      {
        title: 'Умножение и деление чисел (Таблица умножения)',
        fn   : (): [string, string] =>
          (random() > 0.5 ? fnMulFactory : fnDivFactory)(10)()
      },
      { title: '' },
      {
        title: 'Умножение чисел на 2',
        fn   : fnMulFactoryAdv(100, 2)
      },
      {
        title: 'Деление чисел на 2',
        fn   : fnDivFactoryAdv(100, 2)
      },
      {
        title: 'Умножение и деление чисел на 2',
        fn   : (): [string, string] =>
          (random() > 0.5 ? fnMulFactoryAdv : fnDivFactoryAdv)(100, 2)()
      },
      { title: '' },
      {
        title: 'Умножение чисел на 4',
        fn   : fnMulFactoryAdv(100, 4)
      },
      {
        title: 'Деление чисел на 4',
        fn   : fnDivFactoryAdv(100, 4)
      },
      {
        title: 'Умножение и деление чисел на 4',
        fn   : (): [string, string] =>
          (random() > 0.5 ? fnMulFactoryAdv : fnDivFactoryAdv)(100, 4)()
      },
      { title: '' },
      {
        title: 'Умножение чисел на 5',
        fn   : fnMulFactoryAdv(100, 5)
      },
      {
        title: 'Деление чисел на 5',
        fn   : fnDivFactoryAdv(100, 5)
      },
      {
        title: 'Умножение и деление чисел на 5',
        fn   : (): [string, string] =>
          (random() > 0.5 ? fnMulFactoryAdv : fnDivFactoryAdv)(100, 5)()
      },
      { title: '' },
      {
        title: 'Умножение чисел на 3',
        fn   : fnMulFactoryAdv(100, 3)
      },
      {
        title: 'Умножение чисел на 11',
        fn   : fnMulFactoryAdv(100, 11)
      },
      {
        title: 'Умножение чисел до 20',
        fn   : fnMulFactory(20)
      },
      {
        title: 'Умножение чисел до 50',
        fn   : fnMulFactory(50)
      },
    ]
  },
  {
    head : 'Третий',
    tasks: [
      {
        title: 'Сложение и вычитание чисел до 10',
        fn   : fnSumOrDifFactoryAdv(10)
      },
      {
        title: 'Сложение и вычитание чисел до 20',
        fn   : fnSumOrDifFactoryAdv(20)
      },
      {
        title: 'Сложение и вычитание чисел до 50',
        fn   : fnSumOrDifFactoryAdv(50)
      },
      { title: '' },
      {
        title: 'Сложение и вычитание чисел до 100',
        fn   : fnSumOrDifFactoryAdv(100)
      },
      {
        title: 'Сложение и вычитание чисел до 1000',
        fn   : fnSumOrDifFactoryAdv(1000)
      },
      {
        title: 'Сложение и вычитание чисел до 10000',
        fn   : fnSumOrDifFactoryAdv(10000)
      },
    ]
  }
] as {
  head: string,
  tasks: {
    title: string, right: number, total: number, last?: [string, string]
    fn: () => [string, string]
  }[]
}[]
SCHEMA.forEach((v) => { v.tasks.forEach((v) => { v.right = v.total = 0 }) })

function AccordionItem(
  this: TypeReaseContext
): void {
  const nodeC: [HTMLElement] = [] as any
  const $show = store<boolean>(false)

  subscribe($show, (show, [ctx, showC, nodeC, completeC]) => {
    const node = nodeC[0]

    if (showC[0] !== (showC[0] = show) && node) {
      let complete: Function
      const style = node.style, classList = node.classList

      if (!show) {
        style.height = `${node.getBoundingClientRect().height}px`, reflow(node)
        classList.add('collapsing'), classList.remove('collapse', 'show')
        complete = (): void => {
          if (completeC[0] === complete && ctx.on) {
            classList.remove('collapsing'), classList.add('collapse')
          }
        }
        style.height = ''
      } else {
        classList.remove('collapse'), classList.add('collapsing')
        style.height = '0'
        complete = (): void => {
          if (completeC[0] === complete && ctx.on) {
            classList.remove('collapsing'), classList.add('collapse', 'show')
            style.height = ''
          }
        }
        style.height = `${node.scrollHeight}px`
      }

      setTimeout(completeC[0] = complete, 250)
    }
  }, [this, [$show.$], nodeC, [null] as [Function | null]])

  ;(  _e8("div", { class: "accordion-item" })(
    _e8("h2", { class: "accordion-header" })(
      _e8("button", { type: "button", class: "accordion-button", "class--collapsed": /*r2.$*/_$1([$show], (_$0) => (!_$0[0])), "aria-expanded": "true" }, [_ul21('click-prevent', () => { $show.$ = !$show.$ })])(
        _s10("head")(() => {
          _t3("head");
        })
      )
    ),
    _e8("div", { class: "accordion-collapse collapse show", "class--show": /*r1.$*/$show })(
      _t3((nodeC[0] = context().node as any, '')),
      _e8("div", { class: "accordion-body p-0" })(
        _s10("body")(() => {
          _t3("body");
        })
      )
    )
  )
)
}

const CLEAR = 'СТЕРЕТЬ'
const READY = 'ОТВЕТИТЬ'

function App(
  this: TypeReaseContext
): void {
  const $ready = store<boolean>(false)
  const $isRight = store<boolean>(false)
  const $update = store<number>(1)

  const $rights = store<number>(0)
  const $totals = store<number>(0)

  let fn!: () => [string, string]
  let sample = '', answer = ''
  const $sample = store<string>('')
  const $result = store<string>('')

  let classId = 0, taskId = 0
  const $currentTask = store<boolean>(false)

  const $isVertical = storablefySafeAllWithProxy([$innerWidth, $innerHeight], ([w, h]) => w < h)

  ;(
      _e8("div", { class: "text-bg-primary2 d-none2", "style--height": /*r2.$*/_$1([$innerHeight], (_$0) => (_$0[0] * 0.75 + 'px')), "style--background": logobg })(
  )

  )

  ;(
      _e8("div", { class: "position-relative user-select-none", "style--min-height": /*r2.$*/_$1([$innerHeight], (_$0) => (_$0[0] + 'px')) })(
    _e8("div", { class: "container py-3", "class--d-none": /*r1.$*/$currentTask })(
      _e8("div", { class: "accordion" })(
        _t3(SCHEMA.forEach((v, _classId) => {
                        _c7(AccordionItem)([
            ["head", () => { _e8("span")(
              _t3(v.head),
              _t3(" класс")
            ) }],
            ["body", () => { _e8("div", { class: "px-3 py-2" })(
              _t3(v.tasks.forEach((v, _taskId) => {
                      if (v.title) {
                                        _e8("div", { class: "py-2" })(
                  _e8("button", { type: "button", class: "w-100 text-start btn btn-lg2 btn-outline-primary" }, [_ul21('click-prevent', () => {
                              fn = v.fn
                              $ready.$ = false
                              $rights.$ = v.right

                              $result.$ = ''
                              ;[sample, answer] = v.last || (v.total++, v.last = fn())
                              $sample.$ = sample
                              $totals.$ = v.total

                              classId = _classId, taskId = _taskId
                              // console.log([classId, taskId])
                              $currentTask.$ = true
                            })])(
                    _e8("div", { class: "row" })(
                      _e8("div", { class: "col" })(
                        _t3(v.title)
                      ),
                      _e8("div", { class: "col-auto" })(
                        _x2(/*r2.$*/_$1([$update], (_$0) => (_$0[0] && ((): void => {
                                                            _e8("span", { class: ['badge', 'text-bg-' + (v.total ? 'primary' : 'secondary')] })(
                            _t3((v.right + '/' + v.total))
                          )

                                }))))
                      )
                    )
                  )
                )

                      } else {
                                        _e8("div", { class: "my-3 border-bottom border-primary", style: "--bs-border-opacity:0.375;" })()

                      }
                    }))
            ) }]
          ])

            }))
      )
    ),
    _e8("div", { class: "position-absolute w-100 h-100 top-0 start-0 d-flex align-items-stretch", "class--d-none": /*r2.$*/_$1([$currentTask], (_$0) => (!_$0[0])), "class--flex-row": /*r2.$*/_$1([$isVertical], (_$0) => (!_$0[0])), "class--flex-column": /*r1.$*/$isVertical })(
      _e8("div", { class: "p-2 d-flex flex-column", "style--min-width": "60%", "style--min-height": "50%" })(
        _e8("div", { class: "mb-1 w-100 d-flex justify-content-between" })(
          _e8("div")(
            _e8("button", { type: "button", class: "btn btn-sm btn-danger" }, [_ul21('click-prevent', () => { $update.$ = random(), $currentTask.$ = false })])(
              _e8("span", { class: "btn-close d-block btn-close-white ratio ratio-1x1", style: "width:0.375em;" })()
            )
          ),
          _e8("div")(
            _e8("div", { class: "h1 d-inline" })(
              _e8("span", { class: "text-success" })(
                _x2(/*r1.$*/$rights)
              ),
              _t3(" / "),
              _x2(/*r1.$*/$totals)
            )
          )
        ),
        _e8("div", { class: "position-relative flex-fill text-white p-3 d-flex justify-content-center align-items-center", "style--background-color": "#3A6C51", "style--font-size": "2em" })(
          _x2(/*r1.$*/$sample),
          _t3(" = "),
          _x2(/*r1.$*/$result)
        )
      ),
      _e8("div", { class: "flex-fill row p-1 m-0" }, [_ul21('pointerdown-prevent', (e: MouseEvent): void => {
            let el = e.target as HTMLElement
            while (el.localName !== 'button' && el) el = el.parentNode as any
            if (el) {
              const value = el.getAttribute('data-value')
              if (value === READY) {
                if ($result.$) {
                  $isRight.$ = $result.$ === answer
                  $ready.$ = true
                  if ($isRight.$) $rights.$ = ++SCHEMA[classId].tasks[taskId].right
                }
              } else if (value === CLEAR) {
                $result.$ = $result.$.slice(0, -1)
              } else {
                $result.$ += value
              }
            }
          })])(
        _t3((_btn(7), _btn(8), _btn(9))),
        _t3((_btn(4), _btn(5), _btn(6))),
        _t3((_btn(1), _btn(2), _btn(3))),
        _t3((_btn('-'), _btn(0), _btn('.'))),
        _t3((_btn(CLEAR, 6, 'btn-outline-danger'), _btn(READY, 6, 'btn-outline-success')))
      )
    ),
    _e8("div", { class: /*r2.$*/_$1([$isRight, $ready], (_$0) => (['modal position-fixed justify-content-center align-items-center w-100 h-100 top-0 start-0', _$0[1] ? 'd-flex' : 'd-none', _$0[0] ? 'bg-success' : 'bg-danger'])), style: "--bs-bg-opacity:0.5;" })(
      _e8("div", { class: "modal-dialog" })(
        _e8("div", { class: "modal-content" })(
          _e8("div", { class: "modal-body text-center" })(
            _e8("div", { class: /*r2.$*/_$1([$isRight], (_$0) => (['h2', 'text-' + (_$0[0] ? 'success' : 'danger')])) })(
              _x2(/*r2.$*/_$1([$isRight], (_$0) => (_$0[0] ? 'Верно' : 'Неверно'))),
              _t3("!!")
            ),
            _e8("p", { class: "h4" })(
              _t3("Ваш ответ: "),
              _x2(/*r1.$*/$result)
            ),
            _e8("p", { class: "h6" })(
              _x2(/*r2.$*/_$1([$sample], (_$0) => (_$0[0] && sample + ' = ' + answer)))
            )
          ),
          _e8("div", { class: "modal-footer" })(
            _e8("button", { type: "button", class: "btn btn-secondary" }, [_ul21('click-prevent', () => {
                  $ready.$ = false
                  SCHEMA[classId].tasks[taskId].last = null
                  $update.$ = random(), $currentTask.$ = false
                })])(
              _t3("Выйти")
            ),
            _e8("button", { type: "button", class: "btn btn-primary" }, [_ul21('click-prevent', () => {
                  const v = SCHEMA[classId].tasks[taskId]
                  $ready.$ = false
                  $result.$ = ''
                  ;[sample, answer] = v.last = fn()
                  $sample.$ = sample
                  $totals.$ = ++v.total
                })])(
              _t3("Далее")
            )
          )
        )
      )
    )
  )

  )
}

const _btn = (
  val: string | number, col = 4, btn = 'btn-lg btn-outline-secondary'
): void => {
    _e8("div", { class: `col-${col} m-0 p-1` })(
    _e8("button", { type: "button", class: 'w-100 btn ' + btn, "style--min-width": "1rem", "style--min-height": "100%", "data-value": val })(
      _t3(val)
    )
  )

}

createReaseApp(App, { target: document.body })