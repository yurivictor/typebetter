# Contributing to TypeBetter

## Install development dependencies

TypeBetter's build process uses [npm](https://www.npmjs.com/) and [Node.js](http://nodejs.org/). If you're using a Mac, the easiest way to install npm and Node.js (and plenty of other great tools) is with [Homebrew](http://brew.sh/):

	brew install node

If you're using a different operating system, use a different package manager, or prefer not to use Homebrew, check out the [Node.js Downloads page](http://nodejs.org/download/).

## Get set up to contribute

Contributing to TypeBetter is pretty straightforward:

1. Fork the TypeBetter repo and clone your fork.
1. Install development dependencies by running `npm install` from the root of the project.
1. Create a feature branch for the issue or new feature you're looking to tackle: `git checkout -b your-descriptive-branch-name`.
1. _Write some code!_
1. Commit your changes: `git commit -am 'Add some new feature or fix some issue'`.
1. Push the branch to your fork of TypeBetter: `git push origin your-descriptive-branch-name`.
1. Create a new Pull Request and we'll give it a look!

## "But what files do I change?!?"

Excellent question. TypeBetter's source code is in the file `src/typebetter.js`. Make your changes here!

When you're done working (and before you push your code or issue a pull request), run `npm run build` from the root of the project to recreate the files in the `dist` folder. This task will generate compiled and compressed versions of the project.

**Do not directly edit the files in the `dist` folder!**

## Code Style

Code styles are like opinions: Everyone's got one and yours is better than mine. TypeBetter's coding styles are defined in the `.editorconfig` file which uses the [EditorConfig](http://editorconfig.org/) syntax. There are [a number of great plugins for a variety of editors](http://editorconfig.org/#download) that utilize the settings in the `.editorconfig` file.

Basically, follow along with the conventions present in the existing code as best you can.
