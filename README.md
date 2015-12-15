# [![Sia Logo](http://sia.tech/resources/img/svg/sia-green-logo.svg)](http://sia.tech/) User Interface

[![Build Status](https://travis-ci.org/NebulousLabs/Sia-UI.svg?branch=master)](https://travis-ci.org/NebulousLabs/Sia-UI)
[![devDependency Status](https://david-dm.org/NebulousLabs/Sia-UI/dev-status.svg)](https://david-dm.org/NebulousLabs/Sia-UI#info=devDependencies)
[![dependencies Status](https://david-dm.org/NebulousLabs/Sia-UI.svg)](https://david-dm.org/NebulousLabs/Sia-UI#info=dependencies)
[![license:mit](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

# A Highly Efficient Decentralized Storage Network

![A snapshot of the the file library](/doc/assets/files.png)
This is the user interface for [Sia](https://github.com/NebulousLabs/Sia), it
is a desktop application based off the
[electron](https://github.com/atom/electron) framework. The ambition behind
this project is to facilitate easy programmatic interaction between users and
the Sia network.

## Prerequisites

- [node & npm (packaged together)](https://nodejs.org/download/)

## Running

[Download your OS's release archive and unzip it](https://github.com/NebulousLabs/Sia-UI/releases)

### OR

Run from source
* `npm install`
* `npm start`

## Building Distributables

Places packaged versions into release/ folder, see the package.json for details.

* `npm run release`

## Other Commands

Useful commands for development.

* `npm run clean`
will remove node_modules, your Sia state kept in lib/Sia, and the
configuration settings from config.json.
* `npm run fresh`
will run clean, install, then start to simulate a fresh install run of the UI.
* `npm run debug`
will run the UI with a debug port to aide in inspecting the main process.
* `npm run doc`
will generate documentation about the UI's classes and functions. It's somewhat
messy though.
* `npm run lint`
will output style suggestions for the UI's javascript, including for plugins.

## Contributing

Contributions are sought after like a rare pokemon!
Please read the [Developer's Guide](doc/Developers.md) before getting started.

