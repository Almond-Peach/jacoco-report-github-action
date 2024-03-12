# JaCoCo Report GitHub Action

## Inputs

| Name                   | Required | Default value       | Description                                                                                              |
| ---------------------- | -------- | ------------------- | -------------------------------------------------------------------------------------------------------- |
| `github-token`         | yes      | -                   | GitHub personal token to add comment to Pull Request.                                                    |
| `report-path-patterns` | yes      | -                   | Comma separated paths of the generated JaCoCo xml report files (supports wildcard glob pattern).         |
| `comment-title`        | yes      | `### Code coverage` | Title for the Pull Request comment.                                                                      |
| `comment-pass-emoji`   | no       | :green_apple:       | Emoji to use for pass status shown when 'coverage >= min coverage' (should be a GitHub supported emoji). |
| `comment-fail-emoji`   | no       | :apple:             | Emoji to use for fail status shown when 'coverage < min coverage' (should be a GitHub supported emoji).  |

## Usage

```yml
jobs:
  build:
    permissions:
      contents: read
      pull-requests: write
    steps:
      - name: Add code coverage comment to PR
        id: jacoco
        uses: Almond-Peach/jacoco-report-github-action@main
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          report-path-patterns: |
            ${{ github.workspace }}/**/reports/**/report.xml
          comment-title: '### Code Coverage'
          comment-pass-emoji: ':green_apple:'
          comment-fail-emoji: ':apple:'
```
