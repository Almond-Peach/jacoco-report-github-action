import * as core from '@actions/core'
import { injectable } from 'tsyringe'
import { Input, InputFacade, InputKey } from '../common/input'

@injectable()
export class CiInputFacade implements InputFacade {
  private _cachedInput: Input | undefined

  get input(): Input {
    return this._cachedInput ?? this.cacheInput()
  }

  private cacheInput(): Input {
    return (this._cachedInput = this.getInput())
  }

  private getInput(): Input {
    return {
      githubToken: core.getInput(InputKey.GITHUB_TOKEN),
      reportPathPatterns: core.getInput(InputKey.REPORT_PATH_PATTERNS),
      commentTitle: core.getInput(InputKey.COMMENT_TITLE),
      commentPassEmoji: core.getInput(InputKey.COMMENT_PASS_EMOJI),
      commentFailEmoji: core.getInput(InputKey.COMMENT_FAIL_EMOJI),
    }
  }
}
