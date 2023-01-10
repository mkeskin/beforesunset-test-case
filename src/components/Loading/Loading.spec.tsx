import { render } from '@testing-library/react'

import Loading from './Loading'

describe('<Loading>', () => {
  it('render the Loading component and check the visibility is showing', () => {
    const { container } = render(<Loading show={true} />)
    const spans = container.getElementsByTagName('span')

    expect(spans).toHaveLength(1)
  })

  it('render the Loading component and check the visibility is hiding', () => {
    const { container } = render(<Loading show={false} />)
    const spans = container.getElementsByTagName('span')

    expect(spans).toHaveLength(0)
  })
})
