import { styledTheme as theme } from '../theme'

type ThemeInterface = typeof theme

declare module "styled-components" {
  interface DefaultTheme extends ThemeInterface {}
}