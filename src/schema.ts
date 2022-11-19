import { random, randomTo } from './utils'

function fnSumFactory(max: number) {
  return function(): [string, string] {
    const n1 = randomTo(1, max)
    const n2 = randomTo(1, max)
    return [`${n1} + ${n2}`, (n1 + n2).toString()]
  }
}

function fnDifFactory(max: number) {
  return function(): [string, string] {
    let n1 = randomTo(1, max)
    let n2 = randomTo(1, max)
    if (n1 < n2) [n1, n2] = [n2, n1]
    return [`${n1} − ${n2}`, (n1 - n2).toString()]
  }
}

function fnSumOrDifFactory(max: number) {
  return function(): [string, string] {
    let n1 = randomTo(1, max)
    let n2 = randomTo(1, max)
    if (random() > 0.5) {
      return [`${n1} + ${n2}`, (n1 + n2).toString()]
    } else {
      if (n1 < n2) [n1, n2] = [n2, n1]
      return [`${n1} − ${n2}`, (n1 - n2).toString()]
    }
  }
}

function _fixBrts(n: number): number | string { return n < 0 ? `(−${-n})` : n }
function fnSumOrDifFactoryAdv(max: number) {
  return function(): [string, string] {
    const n1 = randomTo(-max, max)
    const n2 = randomTo(-max, max)
    if (random() > 0.5) {
      return [`${_fixBrts(n1)} + ${_fixBrts(n2)}`, (n1 + n2).toString()]
    } else {
      return [`${_fixBrts(n1)} − ${_fixBrts(n2)}`, (n1 - n2).toString()]
    }
  }
}

function fnMulFactory(max: number) {
  return function(): [string, string] {
    const n1 = randomTo(1, max)
    const n2 = randomTo(1, max)
    return [`${n1} × ${n2}`, (n1 * n2).toString()]
  }
}

function fnMulFactoryAdv(max: number, val: number) {
  return function(): [string, string] {
    const n1 = randomTo(1, max)
    return [`${n1} × ${val}`, (n1 * val).toString()]
  }
}

function fnDivFactory(max: number) {
  return function(): [string, string] {
    const n1 = randomTo(1, max)
    const n2 = randomTo(1, max)
    return [`${n1 * n2} ÷ ${n2}`, n1.toString()]
  }
}

function fnDivFactoryAdv(max: number, val: number) {
  return function(): [string, string] {
    const n1 = randomTo(1, max)
    return [`${n1 * val} ÷ ${val}`, n1.toString()]
  }
}

function fnChainFactory(max: number) {
  return function(): [string, string] {
    let n = randomTo(1, max)
    let res = n, txt = '' + n

    n = randomTo(1, max)
    if (n > res || random() > 0.5) {
      res += n, txt += ' + ' + n
    } else {
      res -= n, txt += ' - ' + n
    }

    n = randomTo(1, max)
    if (n > res || random() > 0.5) {
      res += n, txt += ' + ' + n
    } else {
      res -= n, txt += ' - ' + n
    }

    if (random() > 0.5) {
      n = randomTo(1, max)
      if (n > res || random() > 0.5) {
        res += n, txt += ' + ' + n
      } else {
        res -= n, txt += ' - ' + n
      }
    }

    return [txt, res.toString()]
  }
}

function fnChainBracketsFactory(max: number) {
  return function(): [string, string] {
    let n = randomTo(10, max)
    let res = n, txt = '' + n

    n = randomTo(1, max)
    if (n > res) {
      res = n - res, txt = '(' + n + ' - ' + txt + ')'
    } else {
      res -= n, txt = '(' + txt + ' - ' + n + ')'
    }

    n = randomTo(1, max)
    if (random() > 0.5) {
      n += res
      res = n - res, txt = n + ' - ' + txt
    } else {
      res += n
      if (random() > 0.5) txt += ' + ' + n
      else txt = n + ' + ' + txt
    }

    if (random() > 0.5) {
      n = randomTo(1, max)
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
}

export const SCHEMA = [
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
        title: 'Сложение или вычитание чисел до 10',
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
        title: 'Сложение или вычитание чисел до 20',
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
        title: 'КОНТРОЛЬНАЯ РАБОТА №1',
        fn   : () => (random() < 0.25 ? fnSumOrDifFactory(20)
          : random() < 0.33 ? fnChainFactory(20) : fnChainBracketsFactory(20))()
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
        title: 'Сложение или вычитание чисел до 50',
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
        title: 'КОНТРОЛЬНАЯ РАБОТА №2',
        fn   : () => (random() < 0.25 ? fnSumOrDifFactory(50)
          : random() < 0.33 ? fnChainFactory(50) : fnChainBracketsFactory(50))()
      },

      { title: '' },

      {
        title: 'Сложение или вычитание чисел до 100',
        fn   : fnSumOrDifFactory(100)
      },
      {
        title: 'Цепочки чисел до 100',
        fn   : fnChainFactory(100)
      },
      {
        title: 'Цепочки чисел до 100 (со скобками)',
        fn   : fnChainBracketsFactory(100)
      },
      { title: '' },

      {
        title: 'КОНТРОЛЬНАЯ РАБОТА №3',
        fn   : () => (random() < 0.25 ? fnSumOrDifFactory(500)
          : random() < 0.33 ? fnChainFactory(500) : fnChainBracketsFactory(500))()
      },
      
      { title: '' },

      {
        title: 'Сложение или вычитание чисел до 1000',
        fn   : fnSumOrDifFactory(1000)
      },
      {
        title: 'Сложение или вычитание чисел до 10000',
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
        title: 'Умножение чисел на 9',
        fn   : fnMulFactoryAdv(100, 9)
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
    last?: [string, string] | null,
    errors: [string, string][],
    fn: () => [string, string]
  }[]
}[]
SCHEMA.forEach(function(v) {
  v.tasks.forEach(function(v) {
    v.right = v.total = 0, v.errors = []
  })
})
