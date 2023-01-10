import { render } from '@testing-library/react'

import Header from './Header'

describe('<Header>', () => {
  it('render the Header component', () => {
    const { getByAltText } = render(<Header />)
    const logo = getByAltText('brewww')

    expect(logo).toBeInTheDocument()
  })
})
