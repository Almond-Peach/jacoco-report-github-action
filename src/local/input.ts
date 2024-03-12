import { injectable } from 'tsyringe'
import { Input, InputFacade } from '../common/input'

@injectable()
export class LocalInputFacade implements InputFacade {
  get input(): Input {
    return {
      githubToken: 'github-token',
      reportPathPatterns: './.local/reports/**/report.xml',
      commentTitle: '### Code coverage',
      commentPassEmoji: ':green_apple:',
      commentFailEmoji: ':apple:',
    }
  }
}
