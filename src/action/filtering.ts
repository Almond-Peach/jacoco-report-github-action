import * as path from 'path'
import { KotlinPullRequestFile, PullRequestFile } from '../common/github'

export function filterPullRequestFiles(
  pullRequestFiles: PullRequestFile[]
): KotlinPullRequestFile[] {
  return pullRequestFiles
    .map(file => ({ name: path.basename(file.path), url: file.url }))
    .filter(file => file.name.endsWith('.kt'))
}
