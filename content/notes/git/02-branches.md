---
title: "2. Git 分支：创建、开发与合并"
chapter_title: "Git 分支：创建、开发与合并"
weight: 2

date: 2026-09-10T11:10:00+08:00
lastmod: 2026-09-10T11:10:00+08:00

categories: ["Git"]
tags: ["Git", "分支", "合并"]
description: "Git 分支：创建、开发与合并学习笔记。"
---

## 分支的操作

### git branch ——显示分支一览表

git branch命令可以将分支名列表显示，同时确认当前所在分支。

```bash
git branch
```

### git checkout -b ——创建、切换分支

如果想要以当前的master/main分支为基础创建新的分支，需要用到git checkout -b命令。
执行下面命令，创建名为feature-A的分支,同时切换到该分支下。

```bash
git cheakout -b "feature-A"

#等价于

git branch "feature-A"
git checkout "feature-A"
```

在该分支下正常修改代码开发、执行git add命令并提交到话，代码就会提交到feature-A分支。
这样对一个分支不断进行操作的过程，称为“培育分支”。

### 特性(Topic)分支

特性分支是集中实现单一特性，除此之外不进行任何其他操作的分支。
日常开发中，往往会创建多个特性分支，并保留一个可以随时发出软件的稳定分支，稳定分支一般由master/main分支担当。

基于特定主题的作业在特性分支中进行，主题完成后再与master/main分支合并。

总之，特性分支的核心特性正在于隔离开发、并行工作，易于集成和回溯。
典型的工作流如下:

```bash
# 1. 从最新的主分支创建一个新特性分支
git checkout -b feature/user-login

# 2. 在此分支上多次提交（add, commit），开发功能
git add .
git commit -m "content"

# 3. 开发完后，切回主分支并拉取最新更新
git checkout main
git pull

# 4. 合并特性分支（通常加上 --no-ff 保留分支历史）
git merge --no-ff feature/user-login

# 5. 推送合并后的主分支，并删除本地特性分支
git push origin main
git branch -d feature/user-login
```

### git merge ——合并分支

当feature-A已经实现完毕，想要把它合并到主干分支master中。首先要切换到master分支。

```bash
git checkout master
```

然后合并：

```bash
git merge --no-ff feature-A
```

编辑器随后启动，用于录入合并提交的信息。
将编辑器中的内容保存，关闭编辑器，如此便合并完成。

### git log --graph ——以图表形式查看分支

```bash
git log --graph
#以图表的形式输出提交日志，非常直观。
```
