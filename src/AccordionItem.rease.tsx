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
      class="accordion-collapse collapse"
      class--show={$show!!}
    >
      {(nodeC[0] = context().node as any, '')}
      <div class="accordion-body p-0">
        <r-slot r-is="body">body</r-slot>
      </div>
    </div>
  </div>)
}
