export default {
  roots: ['<rootDir>/src'],
  colletCoverageFrom: ['<rootDir>/src/***/*.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
