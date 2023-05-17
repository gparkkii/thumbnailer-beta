import 'styled-components';
import { color } from '.';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof color;
  }
}
