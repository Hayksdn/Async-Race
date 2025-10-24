import { defineRecipe } from '@chakra-ui/react'

export const buttonRecipe = defineRecipe({
  variants: {
    variant: {
      primary: {
        w: 'fit-content',
        bg: 'var(--chakra-colors-primary-orange)',
        px: 6,
        py: 3,
        rounded: 'sm',
        color: 'var(--chakra-colors-primary-white)',
      },
      secondary: {
        w: 'fit-content',
        bg: 'var(--chakra-colors-primary-green)',
        px: 5,
        py: 3,
        rounded: 'sm',
        color: 'var(--chakra-colors-primary-white)',
      },
      transparent: {
        w: 'fit-content',
        bg: 'transparent',
        px: 8,
        py: 6,
        rounded: 'sm',
        color: 'var(--chakra-colors-primary-black)',
        fontWeight: 'medium',
        border: '1px solid rgba(0, 0, 0, 0.5)',
      },
    },
  },
})

