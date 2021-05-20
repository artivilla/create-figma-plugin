import fs from 'fs-extra'
import {
  createCategories,
  parseExportedFunctionsAsync,
  renderFunctionDataToMarkdown
} from 'generate-ts-docs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function main(): Promise<void> {
  try {
    const rootDirectoryPath = resolve(__dirname, '..', '..', '..')
    const globPatterns = ['src/**/*.ts', '!src/**/private/**/*']
    const tsconfigFilePath = join(rootDirectoryPath, 'tsconfig.shared.json')
    const outputFilePath = join(rootDirectoryPath, 'docs', 'utilities.md')
    await generateDocsAsync(globPatterns, tsconfigFilePath, outputFilePath)
  } catch (error) {
    console.error(error.message) // eslint-disable-line no-console
    process.exit(1)
  }
}
main()

async function generateDocsAsync(
  globPatterns: Array<string>,
  tsconfigFilePath: string,
  outputFilePath: string
): Promise<void> {
  const lines: Array<string> = []
  const functionsData = await parseExportedFunctionsAsync(globPatterns, {
    tsconfigFilePath
  })
  const categories = createCategories(functionsData)
  lines.push(
    '<!-- THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. -->'
  )
  lines.push('# Utilities')
  lines.push('')
  lines.push(
    '`@create-figma-plugin/utilities` is an extensive library of utility functions for common Figma plugin operations.'
  )
  lines.push('')
  lines.push('To install:')
  lines.push('')
  lines.push('```')
  lines.push('$ npm install @create-figma-plugin/utilities')
  lines.push('```')
  lines.push('')
  lines.push('The utility functions span the following categories:')
  lines.push('')
  lines.push('- [Events](#events)')
  lines.push('- [Node](#node)')
  lines.push('- [Number](#number)')
  lines.push('- [Object](#object)')
  lines.push('- [Settings](#settings)')
  lines.push('- [String](#string)')
  lines.push('- [UI](#ui-2)')
  lines.push('')
  for (const category of categories) {
    lines.push(`## ${category.name}`)
    lines.push('')
    lines.push('```ts')
    lines.push('import {')
    const functionNames: Array<string> = []
    for (const { name } of category.functionsData) {
      functionNames.push(`  ${name}`)
    }
    lines.push(functionNames.join(',\n'))
    lines.push("} from '@create-figma-plugin/utilities'")
    lines.push('```')
    lines.push('')
    for (const functionData of category.functionsData) {
      lines.push(
        renderFunctionDataToMarkdown(functionData, {
          headerLevel: 3
        })
      )
    }
  }
  await fs.outputFile(outputFilePath, lines.join('\n').trim())
}
