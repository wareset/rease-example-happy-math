/* eslint-disable */
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  _t as _t3,
  _S as _S11,
  _E as _E9,
  _$ as _$1,
  _l as _l21
} from 'rease';
import type { TypeReaseContext } from 'rease'
import { subject, subscribe, context } from 'rease'

function reflow(element: HTMLElement): void { element.offsetHeight }

export function AccordionItem(
  this: TypeReaseContext
): void {
  const nodeC: [HTMLElement] = [] as any
  const $show = subject<boolean>(false)

  subscribe($show, function(show, [ctx, showC, nodeC, completeC]) {
    const node = nodeC[0]

    if (showC[0] !== (showC[0] = show) && node) {
      let complete: Function
      const style = node.style, classList = node.classList

      if (!show) {
        style.height = `${node.getBoundingClientRect().height}px`, reflow(node)
        classList.add('collapsing'), classList.remove('collapse', 'show')
        complete = function(): void {
          if (completeC[0] === complete && ctx.on) {
            classList.remove('collapsing'), classList.add('collapse')
          }
        }
        style.height = ''
      } else {
        classList.remove('collapse'), classList.add('collapsing')
        style.height = '0'
        complete = function(): void {
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

  ;(  _E9("div", { class: "accordion-item" })(
    _E9("h2", { class: "accordion-header" })(
      _E9("button", { type: "button", class: "accordion-button", "class-collapsed": /*r2.$*/_$1([$show], (_$0) => (!_$0[0])), "aria-expanded": "true" }, [_l21('click-prevent', function() { $show.$ = !$show.$ })])(
        _S11("head")(() => {
          _t3("head");
        })
      )
    ),
    _E9("div", { class: "accordion-collapse collapse", "class-show": /*r1.$*/$show })(
      nodeC[0] = context()!.node as any,
      _E9("div", { class: "accordion-body p-0" })(
        _S11("body")(() => {
          _t3("body");
        })
      )
    )
  )
)
}
