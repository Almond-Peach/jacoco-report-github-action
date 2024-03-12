export interface InputFacade {
  get input(): Input
}

export interface Input {
  readonly githubToken: string
  readonly reportPathPatterns: string
  readonly commentTitle: string
  readonly commentPassEmoji: string
  readonly commentFailEmoji: string
}

export class InvalidInputError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidInputError'
  }
}

export const InputKey = {
  GITHUB_TOKEN: 'github-token',
  REPORT_PATH_PATTERNS: 'report-path-patterns',
  COMMENT_TITLE: 'comment-title',
  COMMENT_PASS_EMOJI: 'comment-pass-emoji',
  COMMENT_FAIL_EMOJI: 'comment-fail-emoji',
}
