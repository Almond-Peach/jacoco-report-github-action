import { injectable } from 'tsyringe'
import { Logger } from '../common/logger'

@injectable()
export class LocalLogger implements Logger {
  info(message: string): void {
    console.info(message)
  }

  error(message: string | Error): void {
    console.error(message)
  }
}
