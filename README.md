# MenuBar Recognition Application

This repo is just a slim version of an electron application that points to a webview. It contains everything necessary to build an electron based menubar application.

## Installation Instructions

Run the following commands to test out the application locally.

1. `yarn install`
2. `yarn start`
3. you should see an icon on your menubar showing the application has started.

## Building out a release build
Run the following commands to build a release

### MacOS
1. `yarn install` <- if not yet installed 
2. `yarn build-macos`
3. You should see a folder called release-builds created in the root directory. Inside is the .app file that is the application.