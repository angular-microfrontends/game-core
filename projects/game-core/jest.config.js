module.exports = {
  collectCoverageFrom: [
      'src/app/**',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/projects/game-core/.*\.module\.ts',
  ],
  roots: [
    '<rootDir>/projects/game-core/src',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/projects/game-core/src/jest.setup.ts',
  ],
}
