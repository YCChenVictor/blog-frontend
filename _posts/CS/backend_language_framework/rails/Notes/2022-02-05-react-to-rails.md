---
layout: post
title:
date: ''
categories: rails
note:
---

## Introduction

quick explanation

## Why?

focus on why we need it

## How?

### Setting up Webpacker and React

```bash
$ bundle exec rails webpacker:install
$ bundle exec rails webpacker:install:react
```

and remove `app/javascript/packs/hello_react.jsx`

### start react-dom

```bash
$ yarn add react-dom react-on-rails
```

### add gem

In `Gemfile`,

```ruby
gem "react_on_rails", "~> 6"
```

### config

create `config/initializers/react_on_rails.rb` and input

```ruby
# frozen_string_literal: true

# See https://github.com/shakacode/react_on_rails/blob/master/docs/basics/configuration.md
# for many more options.

ReactOnRails.configure do |config|
  # This configures the script to run to build the production assets by webpack. Set this to nil
  # if you don't want react_on_rails building this file for you.
  config.npm_build_production_command = "RAILS_ENV=production NODE_ENV=production bin/webpack"
  
  ################################################################################
  ################################################################################
  # TEST CONFIGURATION OPTIONS
  # Below options are used with the use of this test helper:
  # ReactOnRails::TestHelper.configure_rspec_to_compile_assets(config)
  ################################################################################
  
  # If you are using this in your spec_helper.rb (or rails_helper.rb):
  #
  # ReactOnRails::TestHelper.configure_rspec_to_compile_assets(config)
  #
  # with rspec then this controls what yarn command is run
  # to automatically refresh your webpack assets on every test run.
  #
  config.npm_build_test_command = "RAILS_ENV=test bin/webpack"
  
  ################################################################################
  ################################################################################
  # SERVER RENDERING OPTIONS
  ################################################################################
  # This is the file used for server rendering of React when using `(prerender: true)`
  # If you are never using server rendering, you should set this to "".
  # Note, there is only one server bundle, unlike JavaScript where you want to minimize the size
  # of the JS sent to the client. For the server rendering, React on Rails creates a pool of
  # JavaScript execution instances which should handle any component requested.
  #
  # While you may configure this to be the same as your client bundle file, this file is typically
  # different. You should have ONE server bundle which can create all of your server rendered
  # React components.
  #
  config.server_bundle_js_file = ""
endGemfile.lock
```

## What?

give an example

## Reference

[React on Rails Tutorial: Integrating React and Ruby on Rails 5.2](https://cognitiveclass.ai/blog/react-on-rails-tutorial-integrating-react-and-ruby-on-rails)
