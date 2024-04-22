# Title

## Purpose

## Concept

### Prisoner Dilemma

| P1 \ p2 | Confess | Silent |
| :---  | :----: | :---: |
| Confess | 4 \ 4 | 1 \ 5 |
| Silent | 5 \ 1 | 2 \ 2 |

* ISP routing game: There are two ISP both do not know their counterpart's strategy. 
  ```mermaid
  graph LR
    ISP1(ISP 1) --#1--> id2(browser 1)
    id1(user 1) --#2--> id2(browser 1)
  
    id3(user 2) --#3--> id4(browser 2)
    id3(user 2) --#4--> id4(browser 2)
  
    id2(browser 1) --request from #1--> id5(data processing)
    id2(browser 1) --request from #2--> id5(data processing)
    id4(browser 2) --request from #3--> id5(data processing)
    id4(browser 2) --request from #4--> id5(data processing)
  
    id5(data processing) --query from #1--> id6(database)
    id5(data processing) --query from #2--> id6(database)
    id5(data processing) --query from #3--> id6(database)
    id5(data processing) --query from #4--> id6(database)
  ```

## Reference

[algorithmic-game-theory](https://www.cs.cmu.edu/~sandholm/cs15-892F13/algorithmic-game-theory.pdf)
