// lib
import { Box, ThemeProvider } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

// component
import BaseModal from '@webapp/components/BaseModal'

// themes
import { theme } from '@webapp/themes/index'

export default {
  title: 'Components/BaseModal',
  component: BaseModal,
} as ComponentMeta<typeof BaseModal>

const Template: ComponentStory<typeof BaseModal> = (args) => (
  <ThemeProvider theme={theme}>
    <BaseModal {...args} />
  </ThemeProvider>
)

export const BaseModalComponent = Template.bind({})
BaseModalComponent.args = {
  isOpen: true,
  children: <Box>This is a modal</Box>,
}
