import * as core from '@actions/core'
import { injectable } from 'tsyringe'
import { StatusFacade } from '../common/status'

@injectable()
export class CiStatusFacade implements StatusFacade {
  setFailed(message: string | Error): void {
    core.setFailed(message)
  }
}
