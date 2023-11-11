// This was just a dependency lol, i dunno why
import type { AxiosStatic } from '../../../node_modules/axios/index.d.ts'

declare global {
  const axios: AxiosStatic
}
