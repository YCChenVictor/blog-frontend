---
layout: post
title: ch13 concurrency
description: ''
date: '2022-05-07'
categories: presentation
note:
mathjax:
mermaid: true
p5:
threeJS:
function_plot:
---

## Introduction & why?

Concurrency is a **decoupling** strategy. It helps us decouple what gets done **from when** it gets done, so we need it if there are too many tasks should be done in a given time; however it causes problems that **same method** return **different results** at the same time and the way to solve the problems is as follow:

* Concurrency Defense Principle
  * Single Responsibility Principle: only responsible for a **signle client**
  * Corollary, Limit the Scope of Data: only **one service** for updating one scope of data
  * Corollary, Use Copies of Data: mulitple services but only **one way** to insert data
  * Corollary, Threads Should Be as Independent as Possible: combined with the above strategies, it should be only **one client** changes only **one scope of data** at the same time

Given the above design principle, we may still facing the following problems:

* Thread-Safe Collections: use the thread-safe collections to avoid updaing data based on the wrong old data
* Producer-Consumer: use this design pattern to solve multiple calculation of threads in a given memory
* Reader-Writer: use semaphore to ensure only **one writer** to a data at the same time

We will use lots of `synchronized` method to solve the problems above, causing following problems:

* client-side: synchronized on the client side but we may forgot to do so
* server-side: synchronized on the server side but subtle problems occur when there are multiple **dependent** variables needs synchronization
* **Dining Philosophers**:
  * Starvation: Some threads is **prohibited from** proceeding for an excessively long time or forever
  * Deadlock: Threads **waiting** for **each other** to finish
  * Livelock: Threads trying to do work but finding another “in the way.”

Then finally, we have following issue:

* Writing Correct Shut-Down Code Is Hard
* Testing Threaded Code

## How? & What?

舉例來講，faria 幼稚園舉辦手速比賽，工程師設計了按鈕，點下去就會加一，如下：

```ruby
def update
  @counter += 1
end
```

如果家長跟小朋友比賽，但工程師都刻意 POST 同一個 method，如下：

```ruby
def update(params)
  ...
  params[:class].find(params[:id]).counter += 1
  ...
end
```

上面的方法看起來沒什麼問題，結果比賽辦得太好了，所以這個比賽隨著日子變得越來越複雜，多了答題機制，還需要複雜的運算。假設比賽後來變成需要機器做一個 5~10 秒的綜合運算，這樣用 concurrency 比較好，則此時 update 變成

```ruby
def update(params)
  ...
  CheckService.perform_sync(params)
  ...
end

def CheckService
  ...
  def perform
    if correct?
      params[:class].find(params[:id]).counter += 1
    end
  end

  private
  def correct?
    ... # 5 ~ 10 seconds
  end
end
```

過了一陣子，老闆覺得小朋友的分數老是超過家長，要工程師研究一下為什麼，這時候我們遇到第一個 issue，解決原則是 Single Responsibility Principle，因為方法都是寫同一個，要 debug，要做實驗要改動 code，都會影響到另外一方，所以最好就是一個 service for 一個 client，如下：

```ruby
def update_parent
  ...
  CheckParentService.perform_sync(params)
  ...
end

def update_student
  ...
  CheckStudentService.perform_sync(params)
  ...
end
...
```

那在持續追查的情況下，發現家長回答的速度太快，結果 service 在 update counter 的時候，都拿到比較舊的 counter，在 service 運算完後 insert 進一大堆分數都一樣的值。這就是我們遇到的第二個 issue，解決原則有兩個，Limit the Scope of Data 與 Use Copies of Data。

Limit the Scope of Data 是在 Service 裡進行同步，我們要在 update 值之前，先同步一次 counter 的數據，在 ruby 裡我們是使用 `Mutex`，如下：

```ruby
class CheckParentService
  def initialize
    ...
    @jobs_mutex = Mutex.new
    @counter = Parent.find(params[:id]).counter
    ...
  end

  def synchronize(&block)
    @jobs_mutex.synchronize(&block)
  end

  def perform
    if correct? # 複雜的計算都在這邊
      synchronize do # 要存進去的時候同步一次
        @counter += 1
      end
    end
  end

  private
  def correct?
  end
end
```

Use Copies of Data 則是一開始我們就不要共享資料，然後搜集好所有 correct 後再一次用個 single thread update，方法如下：

```ruby
class Parent
  attr_reader :counter
  ...
end

class CheckParentService
  def initialize
    ...
    @counter = Parent.find(params[:id]).counter
    @corrects = []
    ...
  end

  def perform
    if correct?
      @corrects << 1
    end
  end

  private
  def correct?
    ...
  end
end

every :day, at: 12
  @counter.sum
end
```

就算我們如此設計了，還是可能遇到問題，第一個問題是我們沒有使用 Thread-Safe Collections。除了 Queue 之外，所有資料結構都可能有 race condition，在 ruby 的解決方法是使用 `concurrent-ruby` gem 來創建資料結構，或是使用如上介紹的 `Mutex` 來 synchronize 資料。

後來工程師都排除這些問題了，但過了一陣子家長的分數還是又低於學生，但有時候又會突然變回來，工程師們經過嚴密的研究，發現有很多家長的 Job 在每天凌晨 12 點的時候根本沒計算完，所以分數時高時低，這帶來下一個 issue，Producer-Consumer。我們可以設計一個 queue，機器可以計算的時候才將 calculation insert 進去，這樣就不會有 Job 丟失的狀況了。所以如果老闆很希望每天凌晨 12 點計算好，那他就要投資更多機器的錢，讓 Consumer 變多，這樣就不會有問題了，我們通常用 `sidekiq` 來達成。

在解決以上問題後，老闆希望看到分數的即時播報，所以一定要在 Service 裡進行同步，這時候我們會遇到下一個 issue，Reader-Writer problem。因為同時間可能會有兩個 writer 會寫入同一格資料的 race condition，我們的解決方法是加入 `semaphore` 告知說先在這格沒有 writer 在寫喔，如下：

```ruby
class CheckParentService
  def initialize
    @jobs_mutex = Mutex.new
    @can_write = nil
  end
  ...
  def perform
    if correct? && @can_write # 寫之前先 check can_write
      synchronize do
        @counter += 1
        @can_write = false # 寫之前先把 can_write 關掉
        save!
        @can_write = true
      end
    end
  end
  ...
end
```

上面的狀況都排除後，其實還是有可能遇到問題。假設老闆覺得這場比賽要刺激一點，就改成比誰先答對 100 題，事後有個家長很生氣，說自己做了 101 題，老闆請工程師了解一下狀況，後來發現是這個 service 的 `synchronize` 出了問題。工程師原先的邏輯是，答對 100 題後，就不再加分了，如下：

```ruby
class CheckParentService
  def initialize
    @counter = Parent.find(params[:id]).counter
    @accomplished = false
  end

  def perform
    @accomplished = true if @counter >= 100
    if correct? && !@accomplished
      synchronize do
        @accomplished # get @accomplished from other threads
        @counter += 1
        save!
      end
    end
  end
  ...
end
```

其實這個問題是無可厚非的，因為一題的計算本來就是 5~10 秒，所以最後本來就有可能有其實已經答對 100 題，但還在計算所以家長多做 1 題的狀況。要改動他就需要同時對 client side 與 server side 進行改動，讓 server-side 還是只需要同步 `@counter`，然後讓題目即時在 client-side 停止，如下：

```ruby
def update_parent
  if @accomplished
    return 'mission accomplished'
  else
    CheckParentService.perform_sync(params)
  end
end

class CheckParentService
  def initialize
    @counter = Parent.find(params[:id]).counter
  end

  def perform
    if @counter >= 100
      @accomplished = true
    elsif correct? && @counter < 100
      synchronize do
        @counter += 1
        save!
      end
    end
  end
  ...
end
```

大家應該會發現引發上面問題的原因是，有兩個 variables 要被同步，而且這兩個變數還相互有關聯。作者說最好的方式就是設計好的邏輯，限縮越少有關連的變數同步越好。

後來老闆覺得家長分數太高，所以就調整了題目難度，需要更多暫存做計算。工程師們發現這一類比較難的 Job 總是不會被計算機計算，因為計算時它需要至少 5MB 的暫存，但總是釋放還不到 5MB 的暫存時，就被其他 Job 佔走了，這就是 Dining Philosophers 中的 Starvation 問題，解決方法是使用 `semaphore`。當此 job 出現時，用 `Mutex` 發出訊號給其他 Job，讓他們先不要再 `perform`

```ruby
class CheckParentService
  def initialize
    ...
    @stop = true
    synchronize do
      @stop
    end
  end

  def perform
    synchronize do
      @stop = false
    end
  end
  ...
end

class CheckStudentService
  def initialize
    ...
  end

  def perform
    if !@stop
      ...
    end
  end
  ...
end
```

後來老闆又覺得可以來一個家長跟學生共同答題的機制，兩個問題都需要一定的計算時間，結果沒設計好，產生 deadlock，如下：

```ruby
class CheckParentService
  ...
  def perform
    if @student_correct
      if correct?
        @parent_correct = true
      end
    else
      # waiting
    end
  end
  ...
end

class CheckStudentService
  ...
  def perform
    if @parent_correct
      if correct?
        @student_correct = true
      end
    else
      # waiting
    end
  end
  ...
end
```

結果有可能 `@parent_correct` 跟 `@student_correct` 都是 `nil`，但因為雙方都要等對方 correct，才會進行後續計算，結果就是都沒有計算。解決辦法一樣是使用 semaphore。當 Job 到 `CheckParentService` 時，可以先檢查 `CheckStudentService` 的訊號，發現 student 還在計算，那我就先算下去了，如下：

```ruby
class CheckParentService
  def initialize
    ...
    synchronize do
      @student_calculating
    end
  end

  def perform
    if @student_correct || @student_calculating
      # do the calculation
      if correct?
        @parent_correct = true
      end
    else
      # waiting
    end
  end
  
  private
  def correct?
    @parent_calculating = true
    ...
  end
end
...
```

我們可能會想說用另外一個方法解決以上問題，就是你如果在計算，那我就先等你算，啊然後我自己先不算，但實際上會產生 livelock，雙方一直在讓對方，如下：

```ruby
class CheckParentService
  ...
  def perform
    if @student_calculating
      @parent_calculating = false
      # waiting
    else
      if correct?
        @parent_correct = true
      end
    end
  end

  private
  def correct?
    @parent_calculating = true
    ... # lots of calculation
    @parent_calculating = false
  end
  ...
end

class CheckStudentService
  ...
  def perform
    if @parent_calculating
      @student_calculating = false
      # waiting
    else
      if correct?
        @student_correct = true
      end
    end
  end
  ...

  private
  def correct?
    @student_calculating = true
    ... # lots of calculation
    @student_calculating = false
  end
  ...
end
```

(to be continue)

## Reference

clean code by Robert
