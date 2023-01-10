import { render } from '@testing-library/react'

import Label from './Label'

describe('<Label>', () => {
  it('render a Label and test the content', () => {
    const { container } = render(<Label>Example</Label>)

    expect(container).toHaveTextContent(/example/i)
  })
})
