#!/usr/bin/env bash
npm install
npm run build:prod
node ./dist/server.js
