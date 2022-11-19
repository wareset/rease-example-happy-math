/* eslint-disable */
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  _C as _C8,
  _t as _t3,
  _E as _E10,
  _l as _l22,
  _i as _i14,
  _$ as _$1,
  _x as _x2,
  _w as _w17
} from 'rease';

// import * as rease from 'rease'
// console.log(rease)

import type { TypeReaseContext } from 'rease'

import { createReaseApp } from 'rease'
import { subject, listen } from 'rease'

import { SCHEMA } from './schema'
import { random, max, round, assess } from './utils'

// @ts-ignore
import logo2 from '../static/logo2.svg'
const logobg = `center / contain no-repeat url("data:image/svg+xml;utf8, ${logo2}") #3A6C51`

import { AccordionItem } from './AccordionItem.rease'

const CLEAR = 'СТЕРЕТЬ'
const READY = 'ОТВЕТИТЬ'

function App(
  this: TypeReaseContext
): void {
  const $ready = subject<boolean>(false)
  const $isRight = subject<boolean>(false)
  const $update = subject<number>(1)

  const $rights = subject<number>(0)
  const $totals = subject<number>(0)

  let fn!: () => [string, string]
  let sample = '', answer = ''
  const $sample = subject<string>('')
  const $result = subject<string>('')

  let classId = 0, taskId = 0
  const $currentTask = subject<boolean>(false)

  const $innerHeight = subject<number>(0)
  const $isVertical = subject<boolean>(false)
  function resize(): void {
    $isVertical.$ = window.innerWidth < ($innerHeight.$ = window.innerHeight)
  }
  resize(), listen(window, 'resize', resize)

  const $settingsTotal = subject<number>(15)
  const $settingsLastBadSample = subject<boolean>(true)
  const $showSettings = subject<boolean>(false)
  const $showFinalPopup = subject<boolean>(false)

  ;(
      _E10("div", { class: "text-bg-primary2 d-none2", "style-height": /*r2.$*/_$1([$innerHeight], (_$0) => (_$0[0] * 0.75 + 'px')), "style-background": logobg })(
    _E10("div", { class: "position-absolute top-0 end-0 p-2" })(
      _E10("button", { class: "btn btn-outline-light" }, [_l22('click', function() { $showSettings.$ = true })])(
        _t3("настройки")
      )
    )
  )

  )

  ;(
      _E10("div", { class: "position-relative user-select-none", "style-height": /*r2.$*/_$1([$innerHeight], (_$0) => (_$0[0] + 'px')) })(
    _E10("div", { class: "position-absolute w-100 h-100 top-0 start-0 overflow-auto" })(
      _E10("div", { class: "container py-3", "class-d-none": /*r1.$*/$currentTask })(
        _E10("div", { class: "accordion" })(
          _t3(SCHEMA.forEach(function(v, _classId) {
                            _C8(AccordionItem)([
              ["head", () => { _E10("span")(
                _t3(v.head),
                _t3(" класс")
              ) }],
              ["body", () => { _E10("div", { class: "px-3 py-2" })(
                v.tasks.forEach(function(v, _taskId) {
                        if (v.title) {
                                            _E10("div", { class: "py-2" })(
                    _E10("button", { type: "button", class: "w-100 text-start btn btn-lg2 btn-outline-primary", disabled: /*r2.$*/_$1([$settingsTotal, $update], (_$0) => (_$0[1] && v.total >= _$0[0])) }, [_l22('click-prevent', function() {
                                if (v.total < $settingsTotal.$) {
                                  fn = v.fn

                                  $result.$ = ''
                                  ;[sample, answer] = v.last || (v.last = fn())
                                  $sample.$ = sample

                                  $totals.$ = v.total
                                  $rights.$ = v.right

                                  classId = _classId, taskId = _taskId
                                  // console.log([classId, taskId])
                                  $currentTask.$ = true
                                }
                              })])(
                      _E10("div", { class: "row" })(
                        _E10("div", { class: "col d-flex align-items-center" })(
                          _E10("small")(
                            _E10("small")(
                              _t3(_taskId + 1),
                              _t3(".")
                            ),
                            _t3(" "),
                            _t3(v.title)
                          )
                        ),
                        _E10("div", { class: "col-auto d-flex align-items-center" })(
                          _w17(/*r1.$*/$update)(() => {
                            _E10("span", { class: ['btn btn-sm', 'btn-outline-' + (v.total ? 'primary' : 'secondary')] })(
                              _E10("span", { class: "text-success" })(
                                _t3(v.right)
                              ),
                              _t3(" / "),
                              _E10("span", { class: "text-danger" })(
                                _t3(v.errors.length)
                              ),
                              _t3(" / "),
                              _t3(v.total)
                            );
                          })
                        )
                      )
                    )
                  )

                        } else {
                                            _E10("div", { class: "my-3 border-bottom border-primary", style: "--bs-border-opacity:0.375;" })()

                        }
                      })
              ) }]
            ])

              }))
        )
      )
    ),
    _E10("div", { class: "position-absolute w-100 h-100 top-0 start-0 d-flex align-items-stretch", "class-d-none": /*r2.$*/_$1([$currentTask], (_$0) => (!_$0[0])), "class-flex-row": /*r2.$*/_$1([$isVertical], (_$0) => (!_$0[0])), "class-flex-column": /*r1.$*/$isVertical })(
      _E10("div", { class: "p-2 d-flex flex-column", "style-min-width": "60%", "style-min-height": "50%" })(
        _E10("div", { class: "mb-1 w-100 d-flex justify-content-between" })(
          _E10("div")(
            _E10("button", { type: "button", class: "btn btn-sm btn-danger" }, [_l22('click-prevent', function() { $update.$ = random(), $currentTask.$ = false })])(
              _E10("span", { class: "btn-close d-block btn-close-white ratio ratio-1x1", style: "width:0.375em;" })()
            )
          ),
          _E10("div")(
            _E10("div", { class: "h1 d-inline" })(
              _E10("span", { class: "text-success" })(
                _x2(/*r1.$*/$rights)
              ),
              _t3(" / "),
              _E10("span", { class: "text-danger" })(
                _x2(/*r2.$*/_$1([$totals], (_$0) => (_$0[0] && SCHEMA[classId].tasks[taskId].errors.length)))
              ),
              _t3(" / "),
              _x2(/*r1.$*/$totals)
            )
          )
        ),
        _E10("div", { class: "position-relative flex-fill text-white p-3 d-flex justify-content-center align-items-center", "style-background-color": "#3A6C51", "style-font-size": "2em" })(
          _x2(/*r1.$*/$sample),
          _t3(" = "),
          _x2(/*r1.$*/$result)
        )
      ),
      _E10("div", { class: "flex-fill row p-1 m-0" }, [_l22('pointerdown-prevent', function(e: MouseEvent): void {
            let el = e.target as HTMLElement
            while (el && el.localName !== 'button') el = el.parentNode as any
            if (el) {
              const value = el.getAttribute('data-value')
              const v = SCHEMA[classId].tasks[taskId]
              if (value === READY) {
                if ($result.$) {
                  $isRight.$ = $result.$ === answer
                  if ($isRight.$) $rights.$ = ++v.right
                  else v.errors.push([sample, answer])
                  $totals.$ = ++v.total
                  $ready.$ = true

                  setTimeout(function() {
                    if ($isRight.$ || !$settingsLastBadSample.$) {
                      const v = SCHEMA[classId].tasks[taskId]
                      const lastAnswer = answer
                      ;[sample, answer] = v.last = fn()
                      if (answer === lastAnswer) [sample, answer] = v.last = fn()
                      $sample.$ = sample
                    }
                    $result.$ = ''
                    if (v.total >= $settingsTotal.$) $showFinalPopup.$ = true
                    $ready.$ = false
                  }, 375)
                }
              } else if (value === CLEAR) {
                $result.$ = $result.$.slice(0, -1)
              } else {
                $result.$ += value
              }
            }
          })])(
        (
            _btn(7), _btn(8), _btn(9),
            _btn(4), _btn(5), _btn(6),
            _btn(1), _btn(2), _btn(3),
            _btn('-'), _btn(0), _btn('.'),
            _btn(CLEAR, 6, 'btn-outline-danger'), _btn(READY, 6, 'btn-outline-success')
          )
      )
    )
  )

  )

  ;(
      _E10("div", { class: /*r2.$*/_$1([$isRight], (_$0) => (['modal fade', _$0[0] ? 'bg-success' : 'bg-danger'])), "class-show": /*r1.$*/$ready, "style-display": /*r2.$*/_$1([$ready], (_$0) => (_$0[0] ? 'block' : 'none')), style: "--bs-bg-opacity:0.75;" })(
    _E10("div", { class: "modal-dialog modal-dialog-centered" })(
      _E10("div", { class: "modal-content text-center" })(
        _E10("div", { class: /*r2.$*/_$1([$isRight], (_$0) => (['h1', 'text-' + (_$0[0] ? 'success' : 'danger')])) })(
          _x2(/*r2.$*/_$1([$isRight], (_$0) => (_$0[0] ? 'Верно' : 'Неверно'))),
          _t3("!!")
        )
      )
    )
  )

  )

  ;(
      _E10("div", { class: "modal fade bg-dark", style: "--bs-bg-opacity:0.75;", "class-show": /*r1.$*/$showSettings, "style-display": /*r2.$*/_$1([$showSettings], (_$0) => (_$0[0] ? 'block' : 'none')) })(
    _E10("div", { class: "modal-dialog modal-dialog-scrollable modal-dialog-centered" })(
      _E10("div", { class: "modal-content" })(
        _E10("div", { class: "modal-body text-center" })(
          _E10("div")(
            _E10("label", { for: "settings-input", class: "form-label" })(
              _t3("Количество решаемых примеров:")
            ),
            _E10("input", { type: "number", class: "form-control", id: "settings-input", value: /*r1.$*/$settingsTotal, placeholder: "не менее 10" }, [_l22('change', function(e: any) { $settingsTotal.$ = max(5, round(+e.target.value || 0)) })])()
          ),
          _E10("div", { class: "form-check form-switch pt-3" })(
            _E10("input", { class: "form-check-input", type: "checkbox", role: "switch", id: "settings-check", checked: /*r1.$*/$settingsLastBadSample }, [_l22('change', function() { $settingsLastBadSample.$ = !$settingsLastBadSample.$ })])(),
            _E10("label", { class: "form-check-label", for: "settings-check" })(
              _t3("Снова показывать нерешенный пример")
            )
          )
        ),
        _E10("div", { class: "modal-footer" })(
          _E10("button", { class: "btn btn-primary w-100" }, [_l22('click', function(): void { $showSettings.$ = false })])(
            _t3("Закрыть")
          )
        )
      )
    )
  )

  )

  ;(
      _i14(/*r1.$*/$showFinalPopup)(function() {
        const v = SCHEMA[classId].tasks[taskId]

        ;(    _E10("div", { class: "modal fade show bg-info", style: "--bs-bg-opacity:0.75;", "style-display": 'block' })(
      _E10("div", { class: "modal-dialog modal-dialog-scrollable modal-dialog-centered" })(
        _E10("div", { class: "modal-content" })(
          _E10("div", { class: "modal-header justify-content-center align-items-center flex-column" })(
            _E10("h3")(
              _t3(SCHEMA[classId].head),
              _t3(" класс")
            ),
            _E10("big")(
              _E10("small")(
                _t3(taskId + 1),
                _t3(".")
              ),
              _t3(" "),
              _t3(v.title)
            )
          ),
          _E10("div", { class: "modal-body" })(
            _E10("div", { class: "text-success" })(
              _t3("Решено задач: "),
              _t3(v.right),
              _t3(" из "),
              _t3(v.total)
            ),
            _E10("div", { class: "text-danger" })(
              _t3("Не решено задач: "),
              _t3(v.errors.length),
              _t3(" из "),
              _t3(v.total)
            ),
            _E10("div", { class: "h4" })(
              _t3("Вероятная оценка: "),
              _t3(assess(v.total, v.right))
            )
          ),
          _E10("div", { class: "modal-footer" })(
            _E10("button", { class: "btn btn-primary w-100" }, [_l22('click', function(): void {
                    $update.$ = random(), $currentTask.$ = false
                    $showFinalPopup.$ = false
                    $ready.$ = false
                    v.last = null
                  })])(
              _t3("Закрыть")
            )
          )
        )
      )
    )
)
      })

  )
}

function _btn(
  val: string | number, col = 4, btn = 'btn-lg btn-outline-secondary'
): void {
    _E10("div", { class: `col-${col} m-0 p-1` })(
    _E10("button", { type: "button", class: 'w-100 btn ' + btn, "style-min-width": "1rem", "style-min-height": "100%", "data-value": val })(
      _t3(val)
    )
  )

}

createReaseApp(document.body, function() {   _C8(App)([])
 })
