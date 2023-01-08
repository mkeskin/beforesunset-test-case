import '@styles/main.scss'

import Header from '@components/Header'
import Container from '@components/Container'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        <Container>{children}</Container>
      </body>
    </html>
  )
}
