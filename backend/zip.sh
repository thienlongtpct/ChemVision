#!/usr/bin/env bash
set -euo pipefail

# run from script directory
cd "$(dirname "$0")"

# create package dir if missing
mkdir -p package

# install requirements if present
if [ -f requirements.txt ]; then
    pip install -r requirements.txt -t ./package
else
    echo "requirements.txt not found, skipping pip install"
fi

# copy necessary files into package (warn if missing)
cp app.py handler.py data.csv ./package/ 2>/dev/null || echo "Some files were not copied (missing?)."

# create zip
cd package
zip -r9 ../function.zip . >/dev/null
cd ..

echo "Created function.zip"