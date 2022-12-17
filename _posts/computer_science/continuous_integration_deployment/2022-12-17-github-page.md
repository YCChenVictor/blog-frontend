---
layout: post
title:
description: ''
date: '2022-12-17'
categories: CI-CD
note:
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish: true
---

## Introduction

TBC

## Why?

As my blog getting bigger, I need it

## How?

### local

[Testing your GitHub Pages site locally with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll)

### deploy errors

[Viewing Jekyll build error messages in your pull request](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-jekyll-build-errors-for-github-pages-sites)

[Troubleshooting Jekyll build errors for GitHub Pages sites](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/troubleshooting-jekyll-build-errors-for-github-pages-sites)

#### tailwind

If we use tailwind, we need to tell github page to include it with CI

In `_config.yml`,

```yaml
include: ["node_modules/tailwindcss"]
```

and create `./github/workflows/deployment-workflow.yml` and input

```yaml
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build:
    runs-on: ubuntu-latest # tell github what environment to build
    
    steps:
      - uses: actions/checkout@v2
      - name: Install Dependencies
        run: npm install

      - name: Build the site in the jekyll/builder container
        run: |
         docker run \
         -v ${{ github.workspace }}:/srv/jekyll -v ${{ github.workspace }}/_site:/srv/jekyll/_site \
         jekyll/builder:latest /bin/bash -c "chmod -R 777 /srv/jekyll && jekyll build --future"

      - name: GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2.5.0
        with:
          build_dir: _site/
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

* `GITHUB_TOKEN`: TBC

### workflow

* A workflow is ?
* The workflow is triggered by a pull request.
* The template as follow

```yaml
name: pr-deployment

on:
  issue_comment:
    types: [created] # when this PR created
```

## What?

give an example

## Reference

[Deploy your pull requests with GitHub Actions and GitHub **Deployments**](https://sanderknape.com/2020/05/deploy-pull-requests-github-actions-deployments/)

[Using Jekyll with Tailwindcss on GitHub Pages](https://medium.com/@mehdi.h/using-jekyll-with-tailwindcss-on-github-pages-50c3d8401230)

[What does ubuntu-latest mean for GitHub Actions?](https://stackoverflow.com/questions/69840694/what-does-ubuntu-latest-mean-for-github-actions)

[CI/CD with Github Actions to deploy on Github Pages](https://medium.com/front-end-weekly/ci-cd-with-github-actions-to-deploy-on-github-pages-73e225f8f131#:~:text=At%20the%20root%20of%20your,to%20store%20your%20workflow%20files.)

[Everything you need to know about getting started with GitHub Actions](https://resources.github.com/whitepapers/github-actions-cheat/)
