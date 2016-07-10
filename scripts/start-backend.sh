#!/bin/sh
. ~/.virtualenvs/hope/bin/activate
PYTHONPATH=$PYTHONPATH:`pwd`/backend python backend/api/api.py
