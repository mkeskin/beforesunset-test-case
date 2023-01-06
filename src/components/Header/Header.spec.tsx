import { render } from '@testing-library/react'

import Header from './Header'

describe('<Header>', () => {
  it('render the Header component', () => {
    const rendered = render(<Header />)
    const logo = rendered.getByTestId('main-logo')

    expect(logo).toBeInTheDocument()
  })
})
