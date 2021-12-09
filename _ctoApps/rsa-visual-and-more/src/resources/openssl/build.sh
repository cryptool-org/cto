#!/bin/bash

cd src/resources/openssl
OPENSSL_VERSION="openssl-3.0.0"
OPENSSL_DIR=${OPENSSL_VERSION}
OPENSSL_JS_PATH="../scripts/rsa-real-use/openssl.js"
OPENSSL_WASM_PATH="../wasm/openssl.wasm"

if [ -d ${OPENSSL_DIR} ]; then
  rm -rf ${OPENSSL_DIR}
fi

if [ -f ${OPENSSL_JS_PATH} ]; then
  rm -rf ${OPENSSL_JS_PATH}
fi

if [ -f ${OPENSSL_WASM_PATH} ]; then
  rm -rf ${OPENSSL_WASM_PATH}
fi

if [ ! -f ${OPENSSL_VERSION}.tar.gz ]; then
  curl -O https://www.openssl.org/source/${OPENSSL_VERSION}.tar.gz
fi

mkdir ${OPENSSL_DIR}
tar xf ${OPENSSL_VERSION}.tar.gz --strip-components=1 --directory=${OPENSSL_DIR}
cd ${OPENSSL_DIR} || exit 1

mkdir -p usr/local/ssl/
ln ../openssl.cnf usr/local/ssl/openssl.cnf

export CC=emcc
export CXX=emcc

LDFLAGS="\
  -s ENVIRONMENT='web'\
  -s FILESYSTEM=1\
  -s MODULARIZE=1\
  -s EXPORT_NAME=OpenSSL\
  -s EXTRA_EXPORTED_RUNTIME_METHODS=\"['callMain', 'FS']\"\
  -s INVOKE_RUN=0\
  -s EXIT_RUNTIME=1\
  -s EXPORT_ES6=1\
  -s USE_ES6_IMPORT_META=0\
  -s ALLOW_MEMORY_GROWTH=1\
  --embed-file usr/local/ssl/openssl.cnf"
# -s WASM_BIGINT=1  Disabled due to tests

if [[ $1 == "debug" ]]; then
  LDFLAGS="$LDFLAGS -s ASSERTIONS=1" # For logging purposes.
fi

export LDFLAGS

emconfigure ./Configure \
  no-hw \
  no-shared \
  no-asm \
  no-threads \
  no-ssl3 \
  no-dtls \
  no-engine \
  no-dso \
  linux-x32 \
  -static\

make apps/progs.h

sed -i 's/$(CROSS_COMPILE)//' Makefile

emmake make -j 16 build_generated libssl.a libcrypto.a apps/openssl

mv apps/openssl apps/openssl.js
sed -i.old '1s;^;\/* eslint-disable *\/;' apps/openssl.js
cp apps/openssl.js ../../scripts/rsa-real-use/
mkdir ../../wasm/
cp apps/openssl.wasm ../../wasm/

if [ -d ${OPENSSL_DIR} ]; then
  rm -rf ${OPENSSL_DIR}
fi

if [ -f ${OPENSSL_VERSION}.tar.gz ]; then
   rm ${OPENSSL_VERSION}.tar.gz
fi