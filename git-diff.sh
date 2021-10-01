#!/bin/bash

git diff --name-only --diff-filter=A main migrations > scripts/output/migrations-diff-add.txt
git diff --name-only --diff-filter=T main migrations > scripts/output/migrations-diff-change.txt
git diff --name-only --diff-filter=D main migrations > scripts/output/migrations-diff-delete.txt
git diff --name-only --diff-filter=M main migrations > scripts/output/migrations-diff-modify.txt
git diff --name-only --diff-filter=R main migrations > scripts/output/migrations-diff-rename.txt
