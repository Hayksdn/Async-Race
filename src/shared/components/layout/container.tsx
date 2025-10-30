import { Box, type BoxProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

type ContainerVariant = 'container' | 'containerXS' | 'containerFull'

interface CustomContainerProps extends BoxProps {
  variant: ContainerVariant
}

export const CustomContainer = forwardRef<HTMLDivElement, CustomContainerProps>(
  ({ variant, children, ...rest }, ref) => {
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
      <Box
        ref={ref} // ✅ attach ref to Box
        w={widths[variant]}
        maxW={maxWidths[variant]}
        {...rest}
      >
        {children}
      </Box>
    )
  }
)

CustomContainer.displayName = 'CustomContainer' // ✅ required for forwardRef
