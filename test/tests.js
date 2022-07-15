import fs from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'
import collect from '../src/index'

let test = process.argv[process.argv.length - 1]
const runSingleTest = test.includes('--')
test = test.replace('--', '')
test += '_test.js'

const methods = fs.readdirSync(path.join(__dirname, '../src/methods'))
const tests = fs.readdirSync(path.join(__dirname, 'methods'))

tests.forEach((file) => {
  describe(file.replace('_test.js', '()'), () => {
    if (!runSingleTest) {
      // eslint-disable-next-line
      require(path.join(__dirname, 'methods', file))(it, expect, collect);
    }
    else if (runSingleTest && file === test) {
      // eslint-disable-next-line
      require(path.join(__dirname, 'methods', file))(it, expect, collect);
    }
  })
})

if (!runSingleTest) {
  describe('general tests', () => {
    it('should test every method', () => {
      const missingTests = collect(methods).diff(collect(tests).transform(t => t.replace(/_test/, ''))).all()
      expect(missingTests).to.eql([])
    })

    it('should document all methods in README.md', () => {
      const content = fs.readFileSync(path.join(__dirname, '../README.md'), 'utf-8')

      const re = /#### `(.*)\(\)`/g
      let matches = re.exec(content)

      const documentedMethods = []

      while (matches !== null) {
        documentedMethods.push(matches[1])
        matches = re.exec(content)
      }

      const missingDocumentation = collect(methods).transform(t => t.replace(/.js/, '')).diff(documentedMethods).all()
      expect(missingDocumentation).to.eql(['symbol.iterator'])
    })

    it('should use correct heading in documentation files', () => {
      const docFiles = fs.readdirSync(path.join(__dirname, '../docs/api'), 'utf-8')

      docFiles.forEach((fileName) => {
        const content = fs.readFileSync(path.join(__dirname, '../docs/api', fileName), 'utf-8')

        const methodName = fileName.replace(/.md/, '')
        const expectedHeading = `# \`${methodName}()\``
        const actualHeading = content.split(/\n/)[0]

        expect(actualHeading).to.eql(expectedHeading)
      })
    })

    it('should document all methods in docs/api', () => {
      const docFiles = fs.readdirSync(path.join(__dirname, '../docs/api'), 'utf-8')
      const methodFiles = fs.readdirSync(path.join(__dirname, '../src/methods'), 'utf-8')

      const docsCollection = collect(docFiles).map(t => t.replace(/.md/, ''))
      const methodsCollection = collect(methodFiles).map(t => t.replace(/.js/, ''))

      expect(methodsCollection.diff(docsCollection).all()).to.eql(['symbol.iterator'])
    })

    it('should not have any dependencies', () => {
      const content = fs.readFileSync('package.json')
      const pckg = JSON.parse(content)

      expect(pckg.dependencies).to.eql(undefined)
    })
  })
}
