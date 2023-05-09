module.exports = {
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
    },
    moduleNameMapper: {
        '^axios$': '<rootDir>/mocks/axios.js'
    }
    
}
