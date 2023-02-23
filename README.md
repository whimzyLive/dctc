# Design Crowd - Technical Challenge

Design Crowd Technical Challenge (DCTC) is created to demonstrate -

- approach to designing a solution
- enterprise grade code quality
- usage of enterprise grade CI/CD toolchain.

## Features

- Calculate Weekdays Between Two Dates
- Calculate Business Days Between Two Dates (supports list of public holidays and rules)

## Repository Architecture

```bash
dctc                           #<-- root directory
├── .github
│ └── workflows/               #<-- Contains CI workflows
├── docs
│ └── CHANGELOG.md             #<-- Changelog for all feature/bugfix releases
├── src
│ ├── enums/
│ ├── guards/
│ ├── types/
│ ├── utils/
| ├── business-day-counter.ts
│ └── index.ts                 #<-- Barrel file to re-export public apis
├── tests/
└── package.json
```

## Getting Started

The following setups describe how to setup the Design Crowd - Technical Challenges repository on your local machine.

### Prerequisites

The project is built with Typescript and dependencies are managed by Yarn. Therefore, at minimum you will need following tools installed.

#### NVM (Recommended)

Install NVM on your Mac or linux by running (install instructions might differ for those using windows)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

#### Node (install Via NVM)

Install supported Node version by running

```bash
# This will automatically download and select the version specified in .nvmrc
nvm install
```

#### Yarn (Global)

Once nvm is installed run, following to install `yarn` cli globally

```bash
npm install yarn -g
```

### Setup

Once all the required prerequisites have been met, run following commands.

#### Install dependencies

Install dependencies using yarn by running

```bash
yarn install
```

#### Testing

All features are backed by one or more unit tests, to run all unit tests run

```bash
yarn test
```

## Tools & Technologies

- Automating releases enabled by [Semantic Release](https://semantic-release.gitbook.io/semantic-release/)
- Consistent Code Styling enforced by [ESLint](https://eslint.org/)
- Code Spacing and formatting enforced by [Prettier](https://prettier.io/)
- Clean commits monitored by [Husky](https://typicode.github.io/husky/#/)
- Commit conventions enforced by [commitlint](https://commitlint.js.org/#/)
- Unit testing provided by [Jest](https://jestjs.io/)
- Continuous integration and delivery provided by [Actions](https://github.com/features/actions)
