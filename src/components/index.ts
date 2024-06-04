import type { App, Component } from 'vue'

import { SvgIcon } from './SvgIcon'
import { SearchForm } from './SearchForm'
import { ProTable } from './ProTable'
import { Auth } from './Auth'
import { DateRangePicker } from './DateRangePicker'
import { SwitchDark } from './SwitchDark'
import { IconifyIcon } from './IconifyIcon'
import { MutilTextInput } from './MutilTextInput'
// import { CategorySelector } from './CategorySelector'
import { SelectorDialog, BrandSelectorDialog } from './Selector'
import { IDEjs, IDEjava } from './IDE'

const Components: {
  [propName: string]: Component
} = {
  SvgIcon,
  SearchForm,
  ProTable,
  Auth,
  DateRangePicker,
  SwitchDark,
  IconifyIcon,
  MutilTextInput,
  SelectorDialog,
  BrandSelectorDialog,
  IDEjs,
  IDEjava,
}

export default {
  install: (app: App) => {
    Object.keys(Components).forEach((key) => {
      app.component(key, Components[key])
    })
  },
}
