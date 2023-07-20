# title

## Purpose

Try to find a good result, not a perfect one for a problem.

## Concept

A greedy algorithm is simple: at each step, pick the optimal move.

### Radio Coverage Problem

Suppose we want to cover all states, WA, MT, ID, OR, NV, UT, CA, AZ and there are five radio stations cover these states. All radio stations have the same cost, so we are going to minimize the number of stations.

![radio states coverage](assets/img/radio_states_coverage)

which means,

| Stations | Covered States |
|---|--------
| 1 | ID, NT, UT |
| 2 | WA, ID, MT |
| 3 | OR, NV, CA |
| 4 | NV, UT |
| 5 | CA, AZ |

#### brute force

```ruby
data = [
  '1' => ['ID', 'NT', 'UT'],
  '2' => ['WA', 'ID', 'MT'],
  '3' => ['OR', 'NV', 'CA'],
  '4' => ['NV', 'UT'],
  '5' => ['CA', 'AZ'],
]

target = ['ID', 'NT', 'UT', 'NV', 'AZ']

all_combinations = [ # O(2^n), each element is either in the combination or not
  data['1'] + data['2'] + data['3'] + data['4'] + data['5'],
  data['1'] + data['2'] + data['3'] + data['5'],
  data['1'] + data['3'] + data['4'] + data['5'],
  ...
]
```

O(2^n) is too high, we can use greedy algorithm to lower the complexity.

#### Greedy Algorithm



## Example

## Reference

[grokking-algorithms-illustrated-programmers-curious](https://www.amazon.com/Grokking-Algorithms-illustrated-programmers-curious/dp/1617292230)
