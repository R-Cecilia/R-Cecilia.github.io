---
title: "AI 与 Agent"
description: "记录 LLM、Agent 开发与上下文工程的学习内容。"
notebook_title: "AI & Agent Notebook"
notebook_icon: "/images/notebooks/agent.svg"
lastmod: 2026-10-20
---

欢迎来到这本学习笔记。

这本笔记整理 LLM 与 AI Agent 的基础概念和工程方法，关注模型如何结合推理、工具、上下文与记忆完成任务。内容会随着学习与实践持续修订。

## 学习路线

先了解 Agent 的发展与技术栈，再学习语言模型、提示工程、缩放法则与幻觉；随后学习 Agent 经典范式、上下文工程、记忆与 RAG，最后了解 Harness 工程。

1. [Agent 入门：发展历程与技术栈]({{< relref "01-foundations.md" >}})
2. [语言模型：从 N-gram 到 Transformer]({{< relref "02-language-models.md" >}})
3. [提示工程：采样参数与提示方法]({{< relref "03-prompt-engineering.md" >}})
4. [语言模型：缩放法则与模型幻觉]({{< relref "04-scaling-and-hallucinations.md" >}})
5. [Agent 经典范式：ReAct、规划与反思]({{< relref "02-patterns.md" >}})
6. [上下文工程：组织模型所需的信息]({{< relref "03-context-engineering.md" >}})
7. [记忆与 RAG：让 Agent 获取知识]({{< relref "04-memory-and-rag.md" >}})
8. [Harness 工程：构建 Agent 控制系统]({{< relref "05-harness-engineering.md" >}})

## 开始之前

建议具备基本的 Python 编程能力。阅读概念时，可以结合一个小型任务思考：模型需要什么信息、如何调用工具、怎样检查输出。

## 如何使用

通过左侧章节目录选择内容，也可以使用正文底部的“上一章 / 下一章”按顺序阅读。左侧搜索框可以按标题筛选本册章节。

这些内容是个人学习过程中的阶段性整理，会继续补充示例、修正理解，并记录实践中的问题。
