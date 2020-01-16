#!/bin/bash

watchman watch-del-all && rm -rf node_modules/ && yarn && rm -rf /tmp/metro-* && yarn android
