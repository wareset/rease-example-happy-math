import 'rease/jsx'
// import * as rease from 'rease'
// console.log(rease)

import type { TypeReaseContext } from 'rease'

import { createReaseApp } from 'rease'
import { subject, listen } from 'rease'

import { SCHEMA } from './schema'
import { max, round, assess } from './utils'

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
  const $update = subject({})

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

  const $settingsTotal = subject<number>(10)
  const $settingsLastBadSample = subject<boolean>(true)
  const $showSettings = subject<boolean>(false)
  const $showFinalPopup = subject<boolean>(false)

  ;(
    <div
      class="text-bg-primary2 d-none2"
      style-height={$innerHeight!! * 0.75 + 'px'}
      style-background={logobg}
    >
      <div class="position-absolute top-0 end-0 p-2">
        <button class="btn btn-outline-light"
          r-on-click={function() { $showSettings.$ = true }}
        >
        настройки
        </button>
      </div>
    </div>
  )

  ;(
    <div
      class="position-relative user-select-none"
      style-height={$innerHeight!! + 'px'}
    >

      <div class="position-absolute w-100 h-100 top-0 start-0 overflow-auto"
      >

        <div class="container py-3"
          class-d-none={$currentTask!!}
        >
          <div class="accordion">
            {
              SCHEMA.forEach(function(v, _classId) {
                <AccordionItem>
                  <span r-slot="head">{v.head} класс</span>
                  <div r-slot="body" class="px-3 py-2">
                    <r-void r-is={
                      v.tasks.forEach(function(v, _taskId) {
                        if (v.title) {
                          <div class="py-2">
                  
                            <button type="button"
                              class="w-100 text-start btn btn-lg2 btn-outline-primary"
                              disabled={($update!! && v.total >= $settingsTotal!!)}

                              r-on-click-prevent={function() {
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
                              }}
                            >
                              <div class="row">
                                <div class="col d-flex align-items-center">
                                  <small>
                                    <small>{_taskId + 1}.</small> {v.title}
                                  </small>
                                </div>
                                <div class="col-auto d-flex align-items-center">
                                  <r-watch r-is={$update!!}>
                                    <span
                                      class={['btn btn-sm', 'btn-outline-' + (v.total ? 'primary' : 'secondary')]}
                                    >
                                      <span class="text-success">{v.right}</span> / <span class="text-danger">{v.errors.length}</span> / {v.total}
                                    </span>
                                  </r-watch>
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
                    }/>
                  </div>
                </AccordionItem>
              })
            }
          </div>
        </div>
      </div>

      <div class="position-absolute w-100 h-100 top-0 start-0 d-flex align-items-stretch"
        class-d-none={!$currentTask!!}
        class-flex-row={!$isVertical!!}
        class-flex-column={$isVertical!!}
      >

        <div class="p-2 d-flex flex-column"
          style-min-width="60%"
          style-min-height="50%"
        >
          <div class="mb-1 w-100 d-flex justify-content-between">
            <div>
              <button type="button"
                class="btn btn-sm btn-danger"
                r-on-click-prevent={function() { $update.$ = {}, $currentTask.$ = false }}
              >
                <span
                  class="btn-close d-block btn-close-white ratio ratio-1x1"
                  style="width:0.375em;"
                />
              </button>
            </div>

            <div>
              <div class="h1 d-inline">
                <span class="text-success">{$rights!!}</span> / <span class="text-danger">{$totals!! && SCHEMA[classId].tasks[taskId].errors.length}</span> / {$totals!!}
              </div>
            </div>
          </div>

          <div
            class="position-relative flex-fill text-white p-3 d-flex justify-content-center align-items-center"
            style-background-color="#3A6C51"
            style-font-size="2em"
          >
            {$sample!!} = {$result!!}
          </div>

        </div>
        
        <div class="flex-fill row p-1 m-0"
          r-on-pointerdown-prevent={function(e: MouseEvent): void {
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
          }}
        >
          <r-void r-is={(
            _btn(7), _btn(8), _btn(9),
            _btn(4), _btn(5), _btn(6),
            _btn(1), _btn(2), _btn(3),
            _btn('-'), _btn(0), _btn('.'),
            _btn(CLEAR, 6, 'btn-outline-danger'), _btn(READY, 6, 'btn-outline-success')
          )}/>
        </div>

      </div>

    </div>
  )

  ;(
    <div
      class={['modal fade', $isRight!! ? 'bg-success' : 'bg-danger']}
      class-show={$ready!!}
      style-display={$ready!! ? 'block' : 'none'}
      style="--bs-bg-opacity:0.75;"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-center">

          <div class={['h1', 'text-' + ($isRight!! ? 'success' : 'danger')]}>
            {$isRight!! ? 'Верно' : 'Неверно'}!!
          </div>
          {/* <div class="modal-footer px-0"> */}

          {/* <div class="row w-100">
              <div class="col-12">
                <button
                  class={['btn', 'btn-warning', 'w-100']}
                  style-opacity={$totals!! && SCHEMA[classId].tasks[taskId].errors.length < 1 ? 0 : 1}
                  r-on-click-prevent-self={() => {
                    const v = SCHEMA[classId].tasks[taskId]
                    if (v.errors.length) {
                      $ready.$ = false
                      $result.$ = ''
                      ;[sample, answer] = v.last = v.errors.shift()
                      $sample.$ = sample
                    }
                  }}
                >Решить нерешенный</button>
              </div>
            </div> */}
          
          {/* <div class="row w-100 pt-2">
              <div class="col-6">
                <button class="btn btn-secondary w-100"
                  r-on-click-prevent-self={() => {
                    $ready.$ = false
                    SCHEMA[classId].tasks[taskId].last = null
                    $update.$ = random(), $currentTask.$ = false
                  }}
                >Выйти</button>
              </div>
              <div class="col-6">
                <button class="btn btn-primary w-100"
                  r-on-click-prevent-self={(): void => {
                    const v = SCHEMA[classId].tasks[taskId]
                    $ready.$ = false
                    $result.$ = ''
                    ;[sample, answer] = v.last = fn()
                    $sample.$ = sample
                  // console.log(v.errors)
                  }}
                >Далее</button>
              </div>
            </div> */}

          {/* </div> */}
          
        </div>
      </div>
    </div>
  )

  ;(
    <div class="modal fade bg-dark" style="--bs-bg-opacity:0.75;"
      class-show={$showSettings!!}
      style-display={$showSettings!! ? 'block' : 'none'}
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body text-center">
            <div>
              <label for="settings-input" class="form-label">Количество решаемых примеров:</label>
              <input type="number" class="form-control"
                id="settings-input"
                value={$settingsTotal!!}
                placeholder="не менее 5"
                r-on-change={function(e: any) { $settingsTotal.$ = max(5, round(+e.target.value || 0)) }}
              />
            </div>
            <div class="form-check form-switch pt-3">
              <input class="form-check-input" type="checkbox" role="switch" id="settings-check"
                checked={$settingsLastBadSample!!}
                r-on-change={function() { $settingsLastBadSample.$ = !$settingsLastBadSample.$ }}
              />
              <label class="form-check-label" for="settings-check">Снова показывать нерешенный пример</label>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary w-100"
              r-on-click={function(): void { $showSettings.$ = false }}
            >Закрыть</button>
          </div>
        </div>
      </div>
    </div>
  )

  ;(
    <r-if
      r-is={$showFinalPopup!!}
      r-children={function() {
        const v = SCHEMA[classId].tasks[taskId]

        ;(<div class="modal fade show bg-info" style="--bs-bg-opacity:0.75;"
          style-display={ 'block'}
        >
          <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header justify-content-center align-items-center flex-column">
                <h3>{SCHEMA[classId].head} класс</h3>
                <big>
                  <small>{taskId + 1}.</small> {v.title}
                </big>
              </div>
              <div class="modal-body">
                <div class="text-success">Решено задач: {v.right} из {v.total}</div>
                <div class="text-danger">Не решено задач: {v.errors.length} из {v.total}</div>
                <div class="h4">Вероятная оценка: {assess(v.total, v.right)}</div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-primary w-100"
                  r-on-click={function(): void {
                    $update.$ = {}, $currentTask.$ = false
                    $showFinalPopup.$ = false
                    $ready.$ = false
                    v.last = null
                  }}
                >Закрыть</button>
              </div>
            </div>
          </div>
        </div>)
      }}
    />
  )
}

function _btn(
  val: string | number, col = 4, btn = 'btn-lg btn-outline-secondary'
): void {
  <div class={`col-${col} m-0 p-1`}>
    <button
      type="button"
      class={'w-100 btn ' + btn}
      style-min-width="1rem"
      style-min-height="100%"
      data-value={val}
    >
      {val}
      {/* <big>{val}</big> */}
    </button>
  </div>
}

createReaseApp(document.body, function() { <App/> })
