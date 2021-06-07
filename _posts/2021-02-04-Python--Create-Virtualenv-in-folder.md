---
title: (Python) Create Virtualenv in folder
description: >-
  why we need it? Multiple versions of python exists, so we need to separate the
  environments by virtualenv. Then the conflicts will not…
date: '2021-02-04T08:39:13.606Z'
categories: []
keywords: []
slug: /@t5204713910/python-create-virtualenv-in-folder-d3926ba15ab1
---

### Set path to that fold:

You should set the path to your “own path”

cd path/to/ github repository

### Examinate the pyenv versions and setup the versions:

pyenv versions   
pyenv local 'what version you want'

### Install virtualenv

pip install virtualenv

### Create virtualenv in it:

python3 -m virtualenv env