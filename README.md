# Unitygame [![Build Status](https://travis-ci.org/malud/unity-game.svg)](https://travis-ci.org/malud/unity-game)
A npm cli package to rapidly create a Unity3D boilerplate project you can start with.

## Installation
    npm install -g unitygame

## Usage
    unitygame create MyUnity3DGame com.company.product

Which creates a folder structure like [this one](https://github.com/malud/unity-game/tree/master/template)
The package option is optional.

## Commands
    create <ProjectName> [bundle-identifier] -p packageShort --dev

This creates the unity project and also installs the listed packages to Unity/Assets/Packages.

### Example - use package shorts
    -p ugb,ubs,testtools

* [UGB - UnityGameBase](https://github.com/kwnetzwelt/ugb-source)
* [UGB-EXAMPLES - UnityGameBase Examples](https://github.com/kwnetzwelt/ugb-examples)
* [UBS - UnityBuildSystem](https://bitbucket.org/kaiwegner/unity-build-system)
* [TESTTOOLS - UnityTestTools](https://bitbucket.org/Unity-Technologies/unitytesttools)
* [WATCHDOG - CodeWatchDog](https://bitbucket.org/flberger_work/codewatchdog_unity)
