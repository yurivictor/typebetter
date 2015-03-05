#!/bin/sh

uglifyjs src/typebetter.js --beautify 'indent-level=2' --output dist/typebetter.js
uglifyjs src/typebetter.js --compress --mangle --output dist/typebetter.min.js
