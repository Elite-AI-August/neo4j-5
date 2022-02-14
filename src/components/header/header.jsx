import { Stack, Text, Image, Persona, DefaultPalette } from '@fluentui/react'
import logo from '../../assets/neomem.png'
import './header.css'

function Header() {
  return (
    <Stack
      horizontal
      styles={{
        root: {
          marginBottom: '8px',
          padding: '4px',
          background: DefaultPalette.black,
        },
      }}
    >
      <Stack horizontal grow>
        <Stack.Item align="center">
          <Stack horizontal>
            <Stack.Item align="center">
              <Image src={logo} alt="logo" height={44} />
            </Stack.Item>
            <Stack.Item align="center">
              <Text
                variant="xxLarge"
                styles={{ root: { color: '#eee', fontWeight: 'normal' } }}
              >
                Neomem
              </Text>
            </Stack.Item>
          </Stack>
        </Stack.Item>
      </Stack>
      <Stack.Item align="center">
        <Persona />
      </Stack.Item>
    </Stack>
  )
}

export default Header
