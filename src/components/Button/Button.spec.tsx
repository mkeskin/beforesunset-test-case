import { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'

import Button from './Button'

const TestComponent = () => {
  const [count, setCounter] = useState(0)

  return (
    <Button
      data-testid="test-button"
      onClick={() => setCounter((count) => count + 1)}
    >
      Result: {count}
    </Button>
  )
}

describe('<Button>', () => {
  it('render a Button and test the onClick event', async () => {
    const { getByTestId, container } = render(<TestComponent />)

    fireEvent.click(getByTestId('test-button'))

    expect(container).toHaveTextContent(/Result: 1/)
  })
})
