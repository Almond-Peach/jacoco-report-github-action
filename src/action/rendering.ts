import { CodeCoverage } from './computation'

export function renderPullRequestComment({
  title,
  codeCoverages,
}: {
  title: string
  codeCoverages: CodeCoverage[]
}): string {
  const tableFirstRow = '| File | Instructions covered, % | Emoji |'
  const tableSecondRow = '| --- | --- | --- |'
  return `${title}\n${tableFirstRow}\n${tableSecondRow}\n${codeCoverages.map(renderCodeCoverage).join('\n')}`
}

function renderCodeCoverage(codeCoverage: CodeCoverage): string {
  const file = `[${codeCoverage.kotlinPullRequestFile.name}](${codeCoverage.kotlinPullRequestFile.url})`
  const emoji: string = codeCoverage.instructionCoverage >= 82 ? ':green_apple:' : ':apple:'
  return `| ${file} | ${codeCoverage.instructionCoverage} | ${emoji} |`
}
