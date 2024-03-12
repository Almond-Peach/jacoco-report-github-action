import { Input, InputKey } from '../common/input'

export function logInput({ input, log }: { input: Input; log: (message: string) => void }): void {
  for (const [key, value] of Object.entries({
    [InputKey.REPORT_PATH_PATTERNS]: input.reportPathPatterns,
    [InputKey.COMMENT_TITLE]: input.commentTitle,
    [InputKey.COMMENT_PASS_EMOJI]: input.commentPassEmoji,
    [InputKey.COMMENT_FAIL_EMOJI]: input.commentFailEmoji,
  })) {
    log(`Input '${key}' is '${value}'.`)
  }
}
