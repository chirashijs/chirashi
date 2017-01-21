#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'

if [[ `codeclimate analyze` == *"Found 0 issues"* ]]; then
  echo -e "${GREEN}No codeclimate's issues"

  exit 0
else
  echo -e "${RED}Found codeclimate's issues"

  exit 1
fi
