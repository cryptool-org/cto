#!/bin/bash

cp openssl/src/apps/openssl.js src/core/ || exit 1
cp openssl/src/apps/openssl.wasm public/ || exit 1

sed -i '1s;^;\/* eslint-disable *\/;' src/core/openssl.js
