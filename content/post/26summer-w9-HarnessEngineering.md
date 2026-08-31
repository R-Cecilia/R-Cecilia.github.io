---
title: "26summer-w9-HarnessEngineering"

date: 2025-08-30T13:10:00+08:00
lastmod: 2025-08-30T13:10:00+08:00

categories: ["Agent开发"]
tags: ["HarnessEngineering", "Skill"]
description: "HarnessEngineeing 和 Skill相关内容的介绍"

cover: /images/cover25.jpg
---

# Harness Engineering

在 AI Agent 领域，Harness 是围绕模型构建的工程控制系统。
Agent=LLM + Harness

## 1 Harness Engineering基本定义

Harness Engineering的核心思想：
每当发现 Agent 犯了某类错误，就花时间在系统层面工程化一个解决方案，使该 Agent 在未来不再犯同类错误。
![](/images/Image/chapter_harness_01_model_plus_harness.svg)

Model（智能引擎） 提供三种核心能力：

- 语言理解：解析自然语言、代码、文档中的语义
- 推理规划：分析问题、制定策略、做出决策
- 内容生成：输出代码、文本、结构化数据
  Harness（驾驭控制系统） 提供六大工程保障：

- 上下文架构：控制哪些信息进入模型，防止信息过载
- 架构约束：用代码强制执行规则，不依赖模型"自律"
- 自验证循环：在 Agent 宣称完成之前，强制执行验证检查
- 上下文隔离：多 Agent 协作时防止错误信息跨 Agent 扩散
- 熵治理：对抗 AI 快速生成带来的技术债累积
- 可拆卸性：随着模型能力提升，优雅地移除不再需要的约束

Model 和 Harness 之间存在双向交互——Model 向 Harness 输出执行结果，Harness 向 Model 反馈约束信息和验证结论，引导下一步行为。这种闭环反馈机制是 Harness Engineering 区别于传统 Prompt Engineering 的核心所在。

## 2 五大核心问题和六大工程支柱

![](/images/Image/chapter_harness_01_five_problems.svg)
![](/images/Image/chapter_harness_02_six_pillars.svg)

## 3 AGENTS.md和Skill System

### 3.1 AGENTS.md

在 Harness Engineering 中，AGENTS.md（或 CLAUDE.md）是放在项目根目录的一个特殊文件，被称为 Agent 宪法（Agent Constitution）。
它的作用是：在 Agent 开始工作之前，告诉它这个项目的规则、架构、约定和边界。
三大原则：

- 机器可读——结构化命名
- 渐进式披露——LLM按需获取文档知识
- 规范行为而非描述状态

### 3.2 Skill System

#### 3.2.1 技能基本概述

Tool -> Skill
技能的三大基本特征：

- 可复用
- 包含专业领域知识
- 可以被发现和组合

Skill的基本架构：

- 基本工具层
- 技能定义层：将工具和知识整合为可以复用的技能单元
  Prompt-based 用精心设计的系统提示注入领域知识和行为指南 Anthropic Skills、Claude Code 知识密集型任务
  Code-based 将技能实现为可执行的代码模块 Voyager 技能库、Semantic Kernel Plugin 需要精确控制的任务
  Workflow-based 将技能编排为状态图或工作流 LangGraph Subgraph、CrewAI Task 多步骤流程型任务
- 技能管理层：管理技能的注册、发现、选择和版本控制。这在多 Agent 系统中尤其重要——每个 Agent 需要声明自己有什么技能，其他 Agent 需要能发现和调用这些技能。

#### 3.2.2 Skill的定义和封装

**prompt-based Skill(提示型技能)**
用结构化的 Prompt 将领域知识和行为指南注入 Agent。
示例：

```markdown
---
name: data-analyst
description: 专业的数据分析技能，能够自动完成数据清洗、分析和可视化
---

# 数据分析师技能

## 你的角色

你是一名专业的数据分析师。当用户提供数据或提出分析需求时，
你会自动执行完整的分析流程。

## 工作流程

1. **数据理解**：检查数据结构、类型、缺失值
2. **数据清洗**：处理异常值和缺失数据
3. **探索性分析**：计算描述统计、发现数据模式
4. **可视化呈现**：选择合适的图表类型
5. **洞察总结**：提供可操作的业务建议

## 关键规则

- 缺失值超过 30% 的列，优先考虑删除而非填充
- 数值异常值使用 IQR 方法（1.5倍四分位距）检测
- 始终在分析开头提供数据质量报告
- 每个可视化都必须有清晰的标题和说明

## 可视化选择指南

| 数据类型 | 分析目标 | 推荐图表      |
| -------- | -------- | ------------- |
| 时间序列 | 趋势     | 折线图        |
| 分类     | 比较     | 柱状图        |
| 数值     | 分布     | 直方图/箱线图 |
| 两个数值 | 关系     | 散点图        |
| 占比     | 构成     | 饼图/环形图   |
```

提示型技能可以嵌套组合，形成层级目录

```markdown
项目级技能/
├── SKILL.md # 项目总技能
├── code-review/
│ └── SKILL.md # 代码审查子技能
├── data-analysis/
│ ├── SKILL.md # 数据分析子技能
│ └── visualization/
│ └── SKILL.md # 可视化子技能（更细粒度）
└── report-writing/
└── SKILL.md # 报告撰写子技能
```

**Code-based Skill**
代码型技能将技能实现为可执行的代码模块——不是通过 Prompt 告诉 Agent 怎么做，而是直接提供可运行的代码。

**Worlflow_based Skill**
工作流型技能将技能编排为有状态的处理流程——定义节点（步骤）和边（转换条件），构成一个完整的工作流。
