---
layout: post
title: structure and bonding
description: ''
date: '2022-07-25'
categories: organic_chemistry
note: 之後有空把 p5 多個顏色
mathjax:
mermaid: true
p5: true
threeJS:
anchor:
publish: true
---

## Introduction

Reviewing atoms, bonds, and molecular geometry.

* Atomic Structure: the Nucleus
* 

## Why?

Anyone with a curiosity about life and living things must first understand organic chemistry. Organic chemistry is the study of carbon compounds.

## How?

(add a tree diagram here to decompose components of atom)

### Nucleus

* a dense, positively charged nucleus
  * subatomic particles called protons, which are positively charged
  * neutrons, which are electrically neutral
* surrounded at a relatively large distance by negaively charged electrons
* number of positive protons in the nucleus = number of negative electrons

<div id='atom' class='h-screen justify-center items-center'>
  <div id='atom_toggle_erase' class=''></div>
  <div id='atom_image_save' class=''></div>
  <div id='atom_canvas' class='border'></div>
</div>

<script>
  const atom_id = 'atom'
  let atom = p5Draw('atom')
  let atomP5 = new p5(atom, atom_id);
</script>

* the number of protons = Z
* the mass number = A = total number of protons plus neutrons
* atomic number: 1 for hydrogen, 6 for carbon, 15 for phosphorus, and so on but different mass numbers depending on neutrons
  * Atoms with the same atomic number but different mass numbers are called isotopes

### Orbitals

* four different kinds: s, p, d, and f, each with a different shape
* stastically, electron spends 90% to 95% of its time in an orbitals, derived from quantum mechanical model
* hybridiztion: the orbitals will not overlap
* the real shape of orbitals is too hard to draw, refer to [Orbitals: Crash Course Chemistry #25](https://www.youtube.com/watch?v=cPDptc0wUYI) for further information
* electron shell simplifies the shape of orbitals to concentric circles as follow

## What?

give an example

## Note

* Organic chemistry, then, is the study of carbon compounds.
* 

## Reference

McMurry Organic Chemistry

[Orbitals: Crash Course Chemistry #25](https://www.youtube.com/watch?v=cPDptc0wUYI)
