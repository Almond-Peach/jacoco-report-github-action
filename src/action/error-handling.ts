import {
  GitHubEventNotSupportedError,
  KotlinPullRequestFilesNotFoundError,
  PullRequestFilesNotFoundError,
  PullRequestNumberMissingError,
} from '../common/github'
import { InvalidInputError } from '../common/input'

export function handleError({
  error,
  log,
  fail,
}: {
  error: unknown
  log: (message: string | Error) => void
  fail: (message: string | Error) => void
}): void {
  log((error as Error) ?? `${error}`)

  switch (true) {
    case error instanceof GitHubEventNotSupportedError ||
      error instanceof PullRequestFilesNotFoundError ||
      error instanceof KotlinPullRequestFilesNotFoundError ||
      error instanceof PullRequestNumberMissingError:
      break
    case error instanceof InvalidInputError || error instanceof Error:
      fail(error)
      break
    default:
      fail(`${error}`)
  }
}
