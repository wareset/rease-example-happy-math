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
    title: string, right: number, total: number,
    last?: [string, string],
    // errors: [string, string][],
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

  ;(<div class="accordion-item">
    <h2 class="accordion-header">
      <button type="button"
        class="accordion-button"
        class--collapsed={!$show!!}
        aria-expanded="true"
        r-on-click-prevent={() => { $show.$ = !$show.$ }}
      >
        <r-slot r-is="head">head</r-slot>
      </button>
    </h2>
    <div
      class="accordion-collapse collapse show"
      class--show={$show!!}
    >
      {(nodeC[0] = context().node as any, '')}
      <div class="accordion-body p-0">
        <r-slot r-is="body">body</r-slot>
      </div>
    </div>
  </div>)
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
    <div
      class="text-bg-primary2 d-none2"
      style--height={$innerHeight!! * 0.75 + 'px'}
      style--background={logobg}
    >
    </div>
  )

  ;(
    <div
      class="position-relative user-select-none"
      style--min-height={$innerHeight!! + 'px'}
    >

      <div class="container py-3"
        class--d-none={$currentTask!!}
      >
        <div class="accordion">
          {
            SCHEMA.forEach((v, _classId) => {
              <AccordionItem>
                <span r-slot="head">{v.head} класс</span>
                <div r-slot="body" class="px-3 py-2">
                  {
                    v.tasks.forEach((v, _taskId) => {
                      if (v.title) {
                        <div class="py-2">
                  
                          <button type="button"
                            class="w-100 text-start btn btn-lg2 btn-outline-primary"

                            r-on-click-prevent={() => {
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
                            }}
                          >
                            <div class="row">
                              <div class="col">{v.title}</div>
                              <div class="col-auto">
                                {$update!! && ((): void => {
                                  <span
                                    class={['badge', 'text-bg-' + (v.total ? 'primary' : 'secondary')]}
                                  >
                                    {(v.right + '/' + v.total)}
                                  </span>
                                })}
                              </div>
                            </div>
                          </button>
                    
                        </div>
                      } else {
                        <div
                          class="my-3 border-bottom border-primary"
                          style="--bs-border-opacity:0.375;"
                        />
                      }
                    })
                  }
                </div>
              </AccordionItem>
            })
          }
        </div>
      </div>

      <div class="position-absolute w-100 h-100 top-0 start-0 d-flex align-items-stretch"
        class--d-none={!$currentTask!!}
        class--flex-row={!$isVertical!!}
        class--flex-column={$isVertical!!}
      >

        <div class="p-2 d-flex flex-column"
          style--min-width="60%"
          style--min-height="50%"
        >
          <div class="mb-1 w-100 d-flex justify-content-between">
            <div>
              <button type="button"
                class="btn btn-sm btn-danger"
                r-on-click-prevent={() => { $update.$ = random(), $currentTask.$ = false }}
              >
                <span
                  class="btn-close d-block btn-close-white ratio ratio-1x1"
                  style="width:0.375em;"
                />
              </button>
            </div>

            <div>
              <div class="h1 d-inline">
                <span class="text-success">{$rights!!}</span> / {$totals!!}
              </div>
            </div>
          </div>

          <div
            class="position-relative flex-fill text-white p-3 d-flex justify-content-center align-items-center"
            style--background-color="#3A6C51"
            style--font-size="2em"
          >
            {$sample!!} = {$result!!}
          </div>

        </div>
        
        <div class="flex-fill row p-1 m-0"
          r-on-pointerdown-prevent={(e: MouseEvent): void => {
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
          }}
        >
          {(_btn(7), _btn(8), _btn(9))}
          {(_btn(4), _btn(5), _btn(6))}
          {(_btn(1), _btn(2), _btn(3))}
          {(_btn('-'), _btn(0), _btn('.'))}
          {(_btn(CLEAR, 6, 'btn-outline-danger'), _btn(READY, 6, 'btn-outline-success'))}
        </div>

      </div>

      <div
        class={['modal position-fixed justify-content-center align-items-center w-100 h-100 top-0 start-0', $ready!! ? 'd-flex' : 'd-none', $isRight!! ? 'bg-success' : 'bg-danger']}
        style="--bs-bg-opacity:0.5;"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body text-center">
              <div class={['h2', 'text-' + ($isRight!! ? 'success' : 'danger')]}>
                {$isRight!! ? 'Верно' : 'Неверно'}!!
              </div>
              <p class="h4">
                Ваш ответ: {$result!!}
              </p>
              <p class="h6">
                {$sample!! && sample + ' = ' + answer}
              </p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary"
                r-on-click-prevent={() => {
                  $ready.$ = false
                  SCHEMA[classId].tasks[taskId].last = null
                  $update.$ = random(), $currentTask.$ = false
                }}
              >Выйти</button>
              <button type="button" class="btn btn-primary"
                r-on-click-prevent={() => {
                  const v = SCHEMA[classId].tasks[taskId]
                  $ready.$ = false
                  $result.$ = ''
                  ;[sample, answer] = v.last = fn()
                  $sample.$ = sample
                  $totals.$ = ++v.total
                }}
              >Далее</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

const _btn = (
  val: string | number, col = 4, btn = 'btn-lg btn-outline-secondary'
): void => {
  <div class={`col-${col} m-0 p-1`}>
    <button
      type="button"
      class={'w-100 btn ' + btn}
      style--min-width="1rem"
      style--min-height="100%"
      data-value={val}
    >
      {val}
      {/* <big>{val}</big> */}
    </button>
  </div>
}

createReaseApp(App, { target: document.body })
