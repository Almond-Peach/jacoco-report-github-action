export interface Logger {
  info(message: string): void
  error(message: string | Error): void
}
