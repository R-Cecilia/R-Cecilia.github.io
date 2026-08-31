---
title: "py06-async异步编程思想"

date: 2025-08-31T11:10:00+08:00
lastmod: 2025-05-31T11:10:00+08:00

categories: ["Python"]
tags: ["async异步编程"]
description: "async异步编程思想介绍"

cover: /images/cover22.jpg
---

# async异步编程思想

## 异步的核心

1. 异步编程的核心思想是通过异步任务避免程序阻塞，提高资源利用率。
2. 实现：

- Python：通过 async/await 和协程实现。
- Java：通过 CompletableFuture 和线程池实现。
- JavaScript：依赖 Promise 和事件循环机制。

## 同步和异步编程的对比

### 同步编程 -> 程序阻塞，效率低下

传统的同步编程可以理解为：必须等待上一个函数执行完毕，才能继续执行下一个函数。

```python
def function1(order_id):
    time.sleep(5)
    print(f"function1已完成")
def function2(order_id):
    time.sleep(10) #模拟第二步是一个需要花费较长时间的过程
    print(f"function2已完成")

def total(order_id)
    function1(order_id)
    function2(order_id)

def main()
    total(1)
    total(2)#按顺序先执行1，再执行2，总耗时5+10+5+10
```

### 异步编程 -> 避免阻塞，效率提升、

异步编程同时执行多个任务，提高了整体的效率。

```python
import asyncio
async def function1(order_id):
    await asyncio.sleep(5)
    print(f"function1已完成")
async def function2(order_id):
    await asyncio.sleep(10) #模拟第二步是一个需要花费较长时间的过程
    print(f"function2已完成")

async def total(order_id)
    await function1(order_id)
    await function2(order_id)

async def main()    #同时处理两个订单，总花费时长5+10
    await asyncio.gather(total(1),total(2))

#运行异步任务
asyncio.run(main())
```

## 异步执行的详细解释

在现代编程中，异步执行（async）已经成为不可或缺的核心概念，尤其是在涉及高性能和高并发的场景下。

异步执行的常见应用场景包括：

- 网络请求：同时处理多个请求而不是等待每个请求完成。
- 文件读写：同时读写多个文件而不是依次进行。
- 任务调度：让 CPU 和 I/O 任务高效协作，避免资源浪费。

核心思想：异步就是让时间不被浪费，能并行的事情尽量并行。

###　异步的技术地位
(1) 高并发需求推动异步崛起

现代应用（尤其是 Web 和移动端）需要处理大量用户请求，同时保持响应速度。例如：

一个电商网站需要同时响应数万用户的搜索请求。
一个聊天应用需要快速处理消息的发送和接收。
异步编程能在 I/O 密集型任务 中发挥出色性能，因为它避免了传统同步模型中“等待”的资源浪费。异步机制让单个线程可以高效处理成千上万的请求。

(2) 现代语言对异步的支持

许多现代编程语言都将异步执行视为关键功能，并内置了强大的支持：

Python：asyncio 库支持协程和异步任务。
JavaScript：基于事件循环，async/await 是 Web 开发的核心。
Java：CompletableFuture 和 Reactor 等库强化了异步能力。
Go：通过 goroutines 和 channel 实现轻量级的并发。
Rust：内置异步生态（如 tokio 和 async-std）解决高性能 I/O 问题。
趋势： 越来越多的编程语言将异步编程作为标准，甚至默认支持，如 JavaScript 和 Go。

### 应用场景中的重要性

(1) 网络和 Web 开发

异步在网络开发中至关重要，因为大量操作涉及等待：

服务器请求：处理 HTTP 请求和数据库查询。
API 调用：实现微服务间的快速交互。
实时更新：如 WebSocket 实现的实时聊天。
例子：

Django（传统同步框架）开始支持异步视图以处理高并发。
Node.js 是异步编程的代表，通过事件驱动和非阻塞 I/O 实现超高并发。
(2) 微服务架构

现代系统多为微服务架构，每个服务之间需要频繁通信。异步让这些服务可以快速响应请求，提升系统的吞吐量和可扩展性。

(3) 数据流和大数据处理

在处理大规模数据流时，异步机制用于实现高效的流式处理。例如：

Kafka 等消息队列系统中异步消费消息。
Spark Streaming 等实时计算框架支持异步处理。
(4) 用户界面与交互

前端开发中，异步让用户界面更流畅：

加载数据时不会卡住页面。
实现异步动画、实时数据刷新。
(5) 游戏开发

异步用于处理资源加载、网络通信等耗时任务，让游戏运行保持流畅。
