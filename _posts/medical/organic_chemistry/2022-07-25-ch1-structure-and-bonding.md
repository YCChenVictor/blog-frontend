---
layout: post
title: structure and bonding
description: ''
date: '2022-07-25'
categories: organic_chemistry
note: 之後有空把 p5 多個顏色，p5 的 structure 應該用 class 來抓 component，不應該是用 id，不過應該先了解 class 在前端 component 的意義是什麼，平常日的 computer day 可以來做；還要修 mathjax
mathjax: true
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

* Anyone with a curiosity about life and living things must first understand organic chemistry
* Organic chemistry is the study of carbon compounds

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

* four different kinds: s, p, d, and f, each with a different shape. s looks like a ball; p looks like a dumbbell; d looks like flower (the real shape of orbitals is too hard to draw, refer to [Orbitals: Crash Course Chemistry #25](https://www.youtube.com/watch?v=cPDptc0wUYI) for further information)
* stastically, electron spends 90% to 95% of its time in an orbitals, derived from quantum mechanical model
* hybridiztion: the orbitals will not overlap
* multiple orbitals forms electron shells; for example, first shell has one s, denoted as 1s; second shell has one s and three p, denoted as 2s + 2p; third shell has one s, three p, and five d, denoted as 3s + 3p + 5d and so on
* each orbital can hold 2 electrons, so first shell can hold 2 electrons, second shell can hold 8 electrons, and third shell can hold 18 electrons
* we can simplify electron shell to concentric circles as follow

<div id='electron_shell' class='h-screen justify-center items-center'>
  <div id='electron_shell_toggle_erase' class=''></div>
  <div id='electron_shell_image_save' class=''></div>
  <div id='electron_shell_canvas' class='border'></div>
</div>

<script>
  const electron_shell_id = 'electron_shell'
  let electron_shell = p5Draw('electron_shell')
  let electronShellP5 = new p5(electron_shell, electron_shell_id);
</script>

### Electron

Electrons follow ground-state electron configuration, a lowest-energy arrangement, which is most stable arrangement; when an electron comes, it goes to the place with lowest energy.

Three rules:

* **Aufbau principle**: the lowest-energy orbitals fill up first, so the order: 1s -> 2s -> 2p -> 3s -> 3p -> 4s -> 3d, ... Noted that it does not follow the order of electron shells but rather the energy level
* **Pauli exclusion principle**: one orbital can only contain 2 electrons at most and these 2 electrons must have opposite spins (math result)
* **Hund’s rule**: for most stable structure, when two or more orbitals with equal energy available such that 2p has three orbitals with equal energy, electrons occupy each orbital with spins parallel until all orbitals are half-full and then start to full these orbitals

Given the rules, the order of filling electrons in each orbitals:

<figure>
  <img src="/assets/img/electron_configuration.png" alt="">
  <figcaption>image source: https://terpconnect.umd.edu</figcaption>
</figure>

and the detail arrangement of 1s 2s 2p 3s:

<div id='electron_detail_arrangement' class='h-screen justify-center items-center'>
  <div id='electron_detail_arrangement_toggle_erase' class=''></div>
  <div id='electron_detail_arrangement_image_save' class=''></div>
  <div id='electron_detail_arrangement_canvas' class='border'></div>
</div>

<script>
  const electronDetailArrangementId = 'electron_detail_arrangement'
  let electronDetailArrangementP5 = new p5(p5Draw(electronDetailArrangementId), electronDetailArrangementId);
</script>

### bonding

* Atoms bond together because of more stable state compared to separation
* Energy flows out when a bond forms
* All atoms tried to be more stable; noble gas has most stable status by nature
  * He ($$1s^2$$)
  * Ne ($$1s^2 2s^2 2p^6$$)
  * Ar ($$1s^2 2s^2 2p^6 3s^2 3p^6$$)
  * Kr (1s²2s²2p⁶2s²3p⁶3d¹⁰4s²4p⁶) (abbreviated as 3d¹⁰4s²4p⁶)
* **ionic bond** example ($$NaCl$$): $$Na$$ ($$1s^2 2s^2 2p^6 3s^1$$) can achieve more stable status by losing one electron ($$1s^2 2s^2 2p^6$$ just like Ne) to $$Na^+$$ and $$Cl$$ ($$1s^2 2s^2 2p^5$$) can achieve more stable status by gaining one electron ($$1s^2 2s^2 2p^6$$ just like Ne) to $$Cl^-$$
* **covalent bond** example ($$CH_4$$): it takes too much energy for C ($$1s^2 2s^2 2p^2$$) to lose 4 electrons or gain 4 electrons, so to be more stable, C will share the electrons with other atoms such as four $$H$$ and we called this stable substance as **molecule** and we can draw it as follow:

<div id='ch4' class='h-screen justify-center items-center'>
  <div id='ch4_toggle_erase' class=''></div>
  <div id='ch4_image_save' class=''></div>
  <div id='ch4_canvas' class='border'></div>
</div>

<script>
  const ch4Id = 'ch4'
  let ch4P5 = new p5(p5Draw(ch4Id), ch4Id);
</script>

* valence bond theory
## What?

### ground-state electron configuration of Oxygen

<div id='electron_configuration_of_oxygen' class='h-screen justify-center items-center'>
  <div id='electron_configuration_of_oxygen_toggle_erase' class=''></div>
  <div id='electron_configuration_of_oxygen_image_save' class=''></div>
  <div id='electron_configuration_of_oxygen_canvas' class='border'></div>
</div>

<script>
  const ElectronConfigurationOfOxygenId = 'electron_configuration_of_oxygen'
  let ElectronConfigurationOfOxygenP5 = new p5(p5Draw(ElectronConfigurationOfOxygenId), ElectronConfigurationOfOxygenId);
</script>

### Predicting the Number of Bonds ($$PH_?$$)

In period table,

* P is the 15th element -> $$1s^2 2s^2 2p^6 3s^2 3p^3$$ -> P needs three more electrons to achieve noble gas
* H is the 1th element -> $$1s^2$$ -> H needs one more electron to achieve noble gas

-> $$PH_3$$

## Reference

McMurry Organic Chemistry

[Orbitals: Crash Course Chemistry #25](https://www.youtube.com/watch?v=cPDptc0wUYI)

[Electron shell](https://en.wikipedia.org/wiki/Electron_shell)

[Electron configuration](https://en.wikipedia.org/wiki/Electron_configuration)

[罕德定則（Hund’s rule](https://highscope.ch.ntu.edu.tw/wordpress/?p=3485)
