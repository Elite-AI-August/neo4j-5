import { Stack, Text, Persona } from '@fluentui/react'
import logo from '../../assets/neomem.png'
import './header.css'

function Header() {
  return (
    <Stack horizontal>
      <Stack.Item grow>
        <img src={logo} alt="logo" />
        <Text variant="xxLarge">Neomem</Text>
      </Stack.Item>
      <Stack.Item>
        {/* <Icon iconName="View" /> */}
        <Persona />
      </Stack.Item>
    </Stack>
  )
}

export default Header
