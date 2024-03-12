import { injectable } from 'tsyringe'
import * as core from '@actions/core'
import { Logger } from '../common/logger'

@injectable()
export class CiLogger implements Logger {
  info(message: string): void {
    core.info(message)
  }

  error(message: string | Error): void {
    core.error(message)
  }
}
