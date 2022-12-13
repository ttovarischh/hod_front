import {} from "styled-components";

import { ThemeType } from "./mainTheme";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
