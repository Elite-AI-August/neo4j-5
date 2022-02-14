import { Stack, Text, Image, Persona } from '@fluentui/react'
import logo from '../../assets/neomem.png'
import './header.css'

function Header() {
  return (
    <Stack horizontal>
      <Stack.Item grow>
        <Image src={logo} alt="logo" height={50} className="logo" />
        <Text variant="xxLarge">Neomem</Text>
      </Stack.Item>
      <Stack.Item>
        <Persona />
      </Stack.Item>
    </Stack>
  )
}

export default Header
