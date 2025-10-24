import { Box, type BoxProps } from '@chakra-ui/react'

type ContainerVariant = 'container' | 'containerXS' | 'containerFull'

interface CustomContainerProps extends BoxProps {
  variant: ContainerVariant
}

export const CustomContainer = ({
  variant,
  children,
  ...rest
}: CustomContainerProps) => {
  const widths = {
    container: {
      base: 'calc(100% - 2.5rem)',
      md: 'calc(100% - 5rem)',
    },
    containerFull: { base: 'calc(100% - 2.5rem)', md: 'calc(100% - 5rem)' },
    containerXS: {
      base: 'calc(100% - 2.5rem)',
      md: 'calc(100% - 5rem)'
    },
  }

  const maxWidths = {
    container: '73.125rem',
    containerFull: 'unset',
    containerXS: '59.375rem',
  }

  return (
    <Box w={widths[variant]} maxW={maxWidths[variant]} {...rest}>
      {children}
    </Box>
  )
}
