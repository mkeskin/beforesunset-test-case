import { fireEvent, render } from '@testing-library/react'

import Collapse from './Collapse'

describe('<Collapse>', () => {
  it('render a Collapse and test the collapsing', () => {
    const { container, getByTestId } = render(
      <Collapse
        header={<div data-testid="collapse-test-header"></div>}
        content={<></>}
      ></Collapse>
    )

    const collapse = container.querySelector('[data-expanded]')

    const heading = getByTestId('collapse-test-header')
    fireEvent.click(heading)

    expect(collapse).toHaveAttribute('data-expanded', 'true')
  })
})
