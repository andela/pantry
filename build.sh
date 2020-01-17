#!/bin/bash

mkdir -p apk
./gradlew assembleRelease --no-build-cache --stacktrace && cp android/app/build/outputs/apk/release/app-release.apk apk/
