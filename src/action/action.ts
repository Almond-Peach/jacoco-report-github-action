import { inject, injectable } from 'tsyringe'
import { GitHubFacade, KotlinPullRequestFile, PullRequestFile } from '../common/github'
import { Input, InputFacade } from '../common/input'
import { Logger } from '../common/logger'
import { StatusFacade } from '../common/status'
import { CodeCoverage, computeCodeCoverages } from './computation'
import { handleError } from './error-handling'
import { filterPullRequestFiles } from './filtering'
import { logInput } from './logging'
import { parseTrees } from './parsing'
import { renderPullRequestComment } from './rendering'
import {
  validateGitHubEvent,
  validateInput,
  validateKotlinPullRequestFiles,
  validatePullRequestFiles,
  validatePullRequestNumber,
} from './validation'

@injectable()
export class Action {
  constructor(
    @inject('Logger') private readonly _logger: Logger,
    @inject('InputFacade') private readonly _inputFacade: InputFacade,
    @inject('StatusFacade') private readonly _statusFacade: StatusFacade,
    @inject('GitHubFacade') private readonly _githubFacade: GitHubFacade
  ) {}

  async run(): Promise<void> {
    try {
      validateGitHubEvent(this._githubFacade.getEventName())

      const input: Input = this._inputFacade.input
      logInput({ input: input, log: message => this._logger.info(message) })
      validateInput(input)

      const pullRequestFiles: PullRequestFile[] = await this._githubFacade.getPullRequestFiles()
      validatePullRequestFiles(pullRequestFiles)

      const kotlinPullRequestFiles: KotlinPullRequestFile[] =
        filterPullRequestFiles(pullRequestFiles)
      validateKotlinPullRequestFiles(kotlinPullRequestFiles)

      const codeCoverages: CodeCoverage[] = computeCodeCoverages({
        trees: await parseTrees(input.reportPathPatterns),
        kotlinPullRequestFiles: kotlinPullRequestFiles,
      })

      await this._githubFacade.addCommentToPullRequest({
        pullRequestNumber: validatePullRequestNumber(this._githubFacade.getPullRequestNumber()),
        title: input.commentTitle,
        body: renderPullRequestComment({ title: input.commentTitle, codeCoverages: codeCoverages }),
      })
    } catch (error: unknown) {
      handleError({
        error,
        log: message => this._logger.error(message),
        fail: message => this._statusFacade.setFailed(message),
      })
    }
  }
}
