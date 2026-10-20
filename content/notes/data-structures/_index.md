---
title: "数据结构"
description: "记录线性表、栈、树与图等数据结构的学习内容。"
notebook_title: "Data Structures Notebook"
notebook_icon: "/images/notebooks/data-structures.svg"
lastmod: 2026-10-20
---

欢迎来到这本学习笔记。

这本笔记围绕数据的组织方式展开，记录常见数据结构的概念、存储表示与操作实现。示例主要使用 C++，适合配合代码练习阅读。

## 学习路线

从数组与链表出发，分别学习链表结构、排序应用与并查集；再比较栈的两种实现，随后学习二叉树的概念、遍历和实现，最后掌握图的概念、存储与遍历。

1. [线性表：数组与顺序存储]({{< relref "01-array-lists.md" >}})
2. [链表结构：单向、循环与双向链表]({{< relref "02-linked-lists.md" >}})
3. [链表应用：箱子排序]({{< relref "03-bin-sort.md" >}})
4. [链表应用：基数排序]({{< relref "04-radix-sort.md" >}})
5. [并查集：等价类与集合合并]({{< relref "05-disjoint-sets.md" >}})
6. [栈：基本概念与数组实现]({{< relref "03-stacks.md" >}})
7. [栈：链表实现]({{< relref "07-linked-stacks.md" >}})
8. [树与二叉树：定义、性质与节点]({{< relref "04-binary-trees.md" >}})
9. [二叉树遍历：前序、中序、后序与层次]({{< relref "09-tree-traversal.md" >}})
10. [二叉树：抽象接口与链式实现]({{< relref "10-binary-tree-implementation.md" >}})
11. [图：基本概念、性质与抽象接口]({{< relref "05-graphs.md" >}})
12. [图的存储：邻接矩阵与邻接表]({{< relref "12-graph-storage.md" >}})
13. [图的遍历：BFS 与 DFS]({{< relref "13-graph-traversal.md" >}})

## 开始之前

建议先掌握 C++ 的数组、指针、类和基本递归。阅读时关注每个操作的边界条件，并用空结构、单元素等情况检查实现。

## 如何使用

通过左侧章节目录选择内容，也可以使用正文底部的“上一章 / 下一章”按顺序阅读。左侧搜索框可以按标题筛选本册章节。

这些内容是个人学习过程中的阶段性整理，会继续补充示例、修正理解，并记录实践中的问题。
