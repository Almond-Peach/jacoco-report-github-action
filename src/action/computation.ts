/* eslint-disable @typescript-eslint/no-explicit-any */
import { KotlinPullRequestFile } from '../common/github'
import { Tree } from './parsing'

export interface CodeCoverage {
  readonly kotlinPullRequestFile: KotlinPullRequestFile
  readonly instructionCoverage: number
}

export function computeCodeCoverages({
  trees,
  kotlinPullRequestFiles,
}: {
  trees: Tree[]
  kotlinPullRequestFiles: KotlinPullRequestFile[]
}): CodeCoverage[] {
  const codeCoverages: CodeCoverage[] = []

  for (const tree of trees) {
    const report = tree[TreeElement.REPORT]
    const packages = report[TreeElement.PACKAGE]

    for (const packagee of packages) {
      const sourceFiles = packagee[TreeElement.SOURCEFILE]

      compareFiles({
        sourceFiles: sourceFiles,
        kotlinPullRequestFiles: kotlinPullRequestFiles,
        equal: codeCoverage => {
          codeCoverages.push(codeCoverage)
        },
      })
    }
  }

  return codeCoverages
}

function compareFiles({
  sourceFiles,
  kotlinPullRequestFiles,
  equal,
}: {
  sourceFiles: any[]
  kotlinPullRequestFiles: KotlinPullRequestFile[]
  equal: (codeCoverage: CodeCoverage) => void
}): void {
  for (const sourceFile of sourceFiles) {
    const sourceFileName = sourceFile[TreeElement.$][TreeElement.NAME]

    for (const kotlinPullRequestFile of kotlinPullRequestFiles) {
      if (kotlinPullRequestFile.name === sourceFileName) {
        equal({
          kotlinPullRequestFile: kotlinPullRequestFile,
          instructionCoverage: computeInstructionCoverage(sourceFile),
        })
      }
    }
  }
}

function computeInstructionCoverage(sourceFile: any): number {
  try {
    const counters = sourceFile[TreeElement.COUNTER].map((it: any) => it[TreeElement.$])
    const instructionCounter = counters.find(
      (it: any) => it[TreeElement.TYPE] === TreeElement.INSTRUCTION
    )

    const numOfCoveredInstructions = Number(instructionCounter.covered)
    const numOfMissedInstructions = Number(instructionCounter.missed)
    const numOfInstructions = numOfCoveredInstructions + numOfMissedInstructions
    const instructionCoverage = Math.round((numOfCoveredInstructions / numOfInstructions) * 100)

    return instructionCoverage
  } catch (e: unknown) {
    return NaN
  }
}

const TreeElement = {
  REPORT: 'report',
  $: '$',
  NAME: 'name',
  PACKAGE: 'package',
  SOURCEFILE: 'sourcefile',
  COUNTER: 'counter',
  TYPE: 'type',
  INSTRUCTION: 'INSTRUCTION',
}
