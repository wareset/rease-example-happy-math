/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  _t as _t3,
  _s as _s10,
  _e as _e8,
  _$ as _$1,
  _ul as _ul21
} from 'rease';
import type { TypeReaseContext } from 'rease'

import { store, subscribe, context } from 'rease'

const reflow = (element: HTMLElement): any => element.offsetHeight

export function AccordionItem(
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
    _e8("div", { class: "accordion-collapse collapse", "class--show": /*r1.$*/$show })(
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