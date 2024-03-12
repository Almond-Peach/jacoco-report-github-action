export interface GitHubFacade {
  getEventName(): string
  getPullRequestNumber(): number | undefined

  getPullRequestFiles(): Promise<PullRequestFile[]>

  addCommentToPullRequest({
    pullRequestNumber,
    title,
    body,
  }: {
    pullRequestNumber: number
    title: string
    body: string
  }): Promise<void>
}

export interface PullRequestFile {
  path: string
  url: string
}

export interface KotlinPullRequestFile {
  name: string
  url: string
}

export class GitHubEventNotSupportedError extends Error {
  constructor(eventName: string) {
    super(
      `The '${eventName}' event is not supported, only the '${GitHubEvent.PULL_REQUEST}' event is supported.`
    )
    this.name = 'GitHubEventNotSupportedError'
  }
}

export class PullRequestFilesNotFoundError extends Error {
  constructor() {
    super('Could not find any files in the pull request.')
    this.name = 'PullRequestFilesNotFoundError'
  }
}

export class KotlinPullRequestFilesNotFoundError extends Error {
  constructor() {
    super('Could not find any kotlin files in the pull request.')
    this.name = 'KotlinPullRequestFilesNotFoundError'
  }
}

export class PullRequestNumberMissingError extends Error {
  constructor() {
    super('Could not figure out the pull request number.')
    this.name = 'PullRequestNumberMissingError'
  }
}

export const GitHubEvent = {
  PULL_REQUEST: 'pull_request',
}
