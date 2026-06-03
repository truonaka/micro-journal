globalThis.IS_REACT_ACT_ENVIRONMENT = true

jest.mock('react', () => jest.requireActual('react'))
jest.mock('react-dom', () => jest.requireActual('react-dom'))
jest.mock('react-dom/client', () => jest.requireActual('react-dom/client'))
