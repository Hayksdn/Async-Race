import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

import { recipes } from './recipes'
import { tokens } from './tokens'

const config = defineConfig({
  theme: {
    tokens,
    recipes,
  },
})

export const system = createSystem(defaultConfig, config)
