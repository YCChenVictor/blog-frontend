# Title

## Purpose

## Concept

* Node is a runtime environment
* Node uses event-driven architecture to handle asynchronous operations: Node.js was built using JavaScript, so it inherits JavaScript's event-driven, asynchronous nature. It operates using an event loop, continuously listening for events such as incoming requests or responses from I/O operations, triggering associated callback functions for asynchronous responses, thus enabling efficient handling of a large number of concurrent connections, making it well-suited for building scalable and high-performance applications.
* Node use require to import module and module.exports to export module
* The event loop is a continuous loop that manages asynchronous events by monitoring a queue of events and dispatching them to appropriate event handlers or callbacks when they occur.
* Node.js 中，什麼是 Stream 物件？它有什麼用途？

### Pros and Cons

#### Pros

* Single Language: Node.js allows developers to use JavaScript both on the client-side and server-side, enabling full-stack development with a single language. This can lead to improved productivity and code reuse.
* Asynchronous and Event-Driven: Node.js is built on an event-driven, non-blocking I/O model, which makes it highly efficient for handling concurrent operations. This can result in high scalability and performance, especially for I/O-heavy applications.
* Vibrant Ecosystem: Node.js has a large and active community that continuously develops and maintains a vast ecosystem of modules and libraries through npm (Node Package Manager). This extensive ecosystem offers solutions for various tasks, reducing development time and effort.
* Fast Execution: Node.js is built on Google's V8 JavaScript engine, which compiles JavaScript directly into machine code, resulting in fast execution speed.
* Lightweight and Scalable: Node.js has a lightweight runtime, which makes it suitable for deploying applications to microservices architectures and cloud platforms. It can efficiently handle high concurrency and scale horizontally.

#### Cons

* Callback Hell: While Node.js's asynchronous nature enables high concurrency and responsiveness, managing asynchronous code with callbacks can lead to callback hell, making code difficult to read and maintain. However, this issue can be mitigated with the use of Promises, async/await, or other control flow libraries.
* Unstable APIs: The Node.js ecosystem evolves rapidly, leading to frequent updates and changes in APIs. This can sometimes result in compatibility issues or require developers to refactor their codebase to adapt to new APIs.
* Limited CPU Intensive Tasks: While Node.js excels in handling I/O-bound tasks, it may not be the best choice for CPU-intensive operations due to its single-threaded nature. CPU-bound tasks can block the event loop, reducing overall performance. Developers often offload such tasks to worker threads or other processes.
* Memory Leaks: Improper management of resources or circular references in Node.js applications can lead to memory leaks, which can degrade application performance and stability over time. Careful attention to memory management practices is necessary to mitigate this risk.
* Learning Curve: For developers new to asynchronous programming or event-driven paradigms, there can be a steep learning curve associated with Node.js. Understanding concepts such as event loops, callbacks, and non-blocking I/O may require time and effort to grasp fully.
 



1. 請解釋關聯式資料庫和非關聯式資料庫 (1)差異 (2)建議何種情境使用非關聯式資料庫。
關聯式相較有結構，所以如果商業邏輯明確，可以直接使用關聯式。另外如果 Join 很明顯太好時間需要 denormalization，可以先考慮 NoSQL








2. 請問您會如何設計關聯式資料庫的 Table ? 確保有一千萬資料的 Table 也有不錯的查詢效能。
我會直接考慮 lndexing









3. 請描述什麼是 (1)正規化與反正規化  (2)建議使用反正規化時機。

正規化將資料分解成更小且相關連的表，可以減少重複性的資料，反正規化通常就是一些正規化操作太耗時例如 heavy read，則考慮使用








4. 什麼是 SQL transaction? transaction 失敗了怎麼辦？
一個 transaction 內可以有多種操作，若失敗應該要全部退回原始狀態










5. 假設現在有 1 會員資料表，擁有 1 千萬筆資料，您需要根據傳入的 1 百萬個會員 ID 更新某個欄位值，請問您會怎麼處理這個需求?
我想到
UPDATE xxx WHERE ID is [...]
但我知道這個效率不好










6. 請描述您對 (1)Redis 的理解 (2)使用時機 (3)指令 keys 是否該使用，請說明原因。

我對 Redis 的理解只有 Cache 很好用，他是 key 去 map 一個物件，並不是關聯式的。











7. 下述這段 Code 印出的 (1)結果為何? (2)為什麼?
for(var i = 0; i < 5; i++){
  setTimeout(()=> {
    console.log(i)
  }, 1000)
}
應該是 5 個 5，因為在要 console log 的時候，i 已經是 5 了










8. (1)寫一個簡單的 closure 風格 function (2)建議使用時機。

function example() {
  
}










9. (1)解釋 JWT 和 Session 的差異是什麼? (2)兩種建議使用時機。
我自己的經驗是兩個不同的概念，JWT 是一種 mechanism，使用者登入後我們給他 token 放在  localstorage，讓前端可以向後端做驗證。session 則是在後端，他登入後我們檢查後端的 token，確認他的身份











10 請您描述使用過那些 GCP 或 AWS 等雲服務，並說明使用經驗或作業方式。

我使用過 AWS，但主要就是 deply production 的程式上去。多數時候會需要與 DevOps 討論如何加速 Depoly 的速度，與管理相關的 credentials。我會維護一個腳本，用於告訴 AWS 我們要用什麼機器部署在哪一個 end point，然後會開啟多少機器處理非同步的 service。

另外也會與 DevOps 討論如何降低成本，例如有些 sites 並不需要這麼多機器，再去調整 scripts。

## Example
