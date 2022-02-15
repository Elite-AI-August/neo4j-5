// import { Stack, Text, Image, Persona, DefaultPalette } from '@fluentui/react'
import { Stack, Text, Persona, DefaultPalette } from '@fluentui/react'
// import logo from '../assets/neomem.png'
import Image from 'next/image'
// import './header.css'

function Header() {
  return (
    <Stack
      horizontal
      styles={{
        root: {
          padding: '4px',
          background: DefaultPalette.black,
        },
      }}
    >
      <Stack horizontal grow>
        <Stack.Item align="center">
          <Stack horizontal>
            <Stack.Item
              align="center"
              styles={{ root: { marginRight: '4px' } }}
            >
              <Image src="/neomem.png" alt="logo" width={40} height={40} />
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
