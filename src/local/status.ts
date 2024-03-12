import { inject, injectable } from 'tsyringe'
import { Logger } from '../common/logger'
import { StatusFacade } from '../common/status'

@injectable()
export class LocalStatusFacade implements StatusFacade {
  constructor(@inject('Logger') private readonly _logger: Logger) {}

  setFailed(message: string | Error): void {
    this._logger.error(message)
  }
}
