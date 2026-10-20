---
title: "1. Agent 入门：发展历程与技术栈"
chapter_title: "Agent 入门：发展历程与技术栈"
weight: 1

date: 2026-08-16T13:10:00+08:00
lastmod: 2026-08-16T15:13:00+08:00

categories: ["Agent开发"]
tags: ["Agent", "Agent Stack"]
description: "Agent 入门：发展历程与技术栈学习笔记。"
url: "/post/26summer-w8-agent基础/"
---

## Agent的发展

### 发展历程

![Agent发展历程](/images/Image/1.1.png)

### AI Agent Stack

来自Letta团队在2024年发布的Agent技术栈总览。
原帖来自https://www.letta.com/blog/ai-agents-stack/
![AI Agent Stack](/images/Image/1.2.webp)

2024年，该团队将Agent技术栈分为了6层:

- Model Serving：提供LLM基础服务
- Storage：储存Agent需要的Memory、RAG所需知识库等内容，分为传统数据库和向量数据库
- Tools & libraries：Agent调用工具、存储记忆、沙箱运行
- Agent frameworks：Agent框架构建
- Agent hosting and agent serving：
- Veritical Agent：特定领域垂直特化的Agent工具

两年后，随着技术发展，新的Agent Stack如下
原帖来自https://www.oreilly.com/radar/the-ai-agents-stack-2026-edition/
![AI Agent Stack](/images/Image/1.3.png)

当前(2026年)下，新的技术栈特征呈现如下趋势:

- Models and inference：开源模型和闭源模型并驾齐驱，在实际应用层面要权衡模型性能和成本。
- Protocols and tools：MCP成为工具调用界的standard，但安全风险还有待解决。
- Memory and knowledge：记忆层从subset已演变为复杂但关键的架构层，Prompt Engineering演变成Context Enginering。GraphRAG（图关系检索，Neo4j主导）作为向量检索的补充进入开发者视野。
- Frameworks and SDKs：框架选择已成为影响开发速度、模型灵活性和长期迁移成本的关键决策。需要根据开发实际情况进行框架选择。
- Eval and observability：评估观测Agent是否有效工作，这是Agent生产化的最大瓶颈。
- Guardrails and safety：阻止Agent做出不当行为，包括过滤输入、授权工具调用和验证输出。
