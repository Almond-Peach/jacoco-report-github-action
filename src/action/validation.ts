import {
  GitHubEvent,
  GitHubEventNotSupportedError,
  KotlinPullRequestFile,
  KotlinPullRequestFilesNotFoundError,
  PullRequestFile,
  PullRequestFilesNotFoundError,
  PullRequestNumberMissingError,
} from '../common/github'
import { Input, InputKey, InvalidInputError } from '../common/input'

export function validateGitHubEvent(eventName: string): void {
  if (eventName !== GitHubEvent.PULL_REQUEST) {
    throw new GitHubEventNotSupportedError(eventName)
  }
}

export function validateInput(input: Input): void {
  if (!input.githubToken) {
    throw new InvalidInputError(`Input '${InputKey.GITHUB_TOKEN}' is empty.`)
  }
  if (!input.reportPathPatterns) {
    throw new InvalidInputError(`Input '${InputKey.REPORT_PATH_PATTERNS}' is empty.`)
  }
  if (input.commentTitle.trim().length === 0) {
    throw new InvalidInputError(`Input '${InputKey.COMMENT_TITLE}' is blank.`)
  }
}

export function validatePullRequestFiles(pullRequestFiles: PullRequestFile[]): void {
  if (pullRequestFiles.length === 0) {
    throw new PullRequestFilesNotFoundError()
  }
}

export function validateKotlinPullRequestFiles(
  kotlinPullRequestFile: KotlinPullRequestFile[]
): void {
  if (kotlinPullRequestFile.length === 0) {
    throw new KotlinPullRequestFilesNotFoundError()
  }
}

export function validatePullRequestNumber(pullRequestNumber: number | undefined): number {
  if (pullRequestNumber === undefined) {
    throw new PullRequestNumberMissingError()
  } else {
    return pullRequestNumber
  }
}
