---
title: "4. Git 远程协作：推送、克隆与拉取"
chapter_title: "Git 远程协作：推送、克隆与拉取"
weight: 4

date: 2026-09-10T11:10:00+08:00
lastmod: 2026-09-10T11:10:00+08:00

categories: ["Git"]
tags: ["Git", "远程仓库", "push", "clone", "pull"]
description: "Git 远程协作：推送、克隆与拉取学习笔记。"
---

## 推送至远程仓库

### git remote add ——添加远程仓库

首先，在Github上创建仓库，然后通过命令将该仓库设置为本地仓库的远程仓库。

```bash
git remote add origin ....git
#Git会将.git远程仓库的名称设置为origin(标识符)
```

### git push——推送至远程仓库

```bash
git push -u origin master
# 当前分支的内容会被推送给远程仓库origin的master分支。-u参数可以在推送的同时，将origin仓库的master分支设置为本地仓库当前分支的upstream（上游）。
```

执行该操作后，当前本地仓库的master分支的内容会被推送到Github的远程仓库。

```bash
#除了master分支以外，远程仓库也可以创建其他分支
git checkout -b feature-D
git push -u origin feature-D
#相当于在本地分支里创建了feature-D分支，然后将它push给远程仓库并保持分支名不变.
```

## 从远程仓库获取

### git clone——获取远程仓库

```bash
git clone .git
```

该命令可将Github远程仓库的内容clone到本地。

### git pull——获取最新的远程仓库分支

```bash
git pull
```

用git pull命令将本地的分支更新到最新状态。
Github端远程仓库中的某分支是最新状态，所以本地仓库中的该分支就得到了更新。
