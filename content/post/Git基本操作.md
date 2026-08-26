---
title: "Git基本操作指南"

date: 2025-05-24T11:10:00-15:00
lastmod: 2025-05-24T11:10:00-15:00

categories: ["Git"]
tags: ["Git"]
description: "基本的git操作"

cover: /images/cover2.png
---

# Git基本操作

## 1. git init ——初始化仓库

要使用Git进行版本管理必须先 初始化仓库。建立一个目录，在该目录下创建仓库。

```bash
git init
```

## 2. git status ——查看仓库状态

git status 用于显示Git仓库状态

```bash
git status
```

该命令显示了当前所处的分支以及可提交的内容

## 3. git add ——向暂存区中添加文件

要让文件成为Git仓库的管理对象，需要用git add命令将其加入暂存区。暂存区是提交之前的一个临时区域。

## 4. git commit ——保存仓库的历史记录

如果只需要简洁地记录提交信息，用下面命令:

```bash
git commit -m "content"
```

-m参数后的内容称为提交信息，是对这个提交的概述。
如果不加-m，直接执行git commit命令，执行后编辑器就会启动，
在编辑器中记述提交信息的格式如下：

- 第一行：用一行文字简述提交内容
- 第二行：空行
- 第三行：记述更改的原因和详细内容

## 5. git log ——查看提交日志

git log命令可以查看以往仓库的提交日志，包括可以查看什么人在什么时候进行了提交或合并，以及操作前后有怎样的差别。

```bash
git log
```

命令执行后会显示哈希值、Author、Date和提交信息
git log命令可以利用多种参数，查文档即可。

## 6. git diff ——查看更改前后的差别

git diff可以查看工作区、暂存区、最新提交之间的差别。

```bash
git diff
```

```bash
git diff HEAD
```

HEAD是指向当前分支最新一次提交的指针，可以查看本次提交与上次提交之间有什么差别。

## 7. 分支的操作

### 7.1 git branch ——显示分支一览表

git branch命令可以将分支名列表显示，同时确认当前所在分支。

```bash
git branch
```

### 7.2 git checkout -b ——创建、切换分支

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

### 7.3 特性(Topic)分支

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

### 7.4 git merge ——合并分支

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

### 7.5 git log --graph ——以图表形式查看分支

```bash
git log --graph
#以图表的形式输出提交日志，非常直观。
```

## 8. 更改提交操作

### 8.1 git reset ——回溯历史版本

通过git reset --hard命令，只需要提供目标时间点的哈希值，就可以完全恢复到该时间点的状态。

```bash
git reset --hard 哈希值
```

回溯、推进历史，合并过程中可能存在冲突(Conflict)，此时必须打开编辑器对冲突部分进行编辑。

### 8.2 git commit --amend ——更改提交信息

通过git commit --amend 修改提交信息。

```bash
git commit --amend
```

命令执行后，编辑器就会启动，修改之前的提交信息，保存文件，关闭编辑器，即可完成提交信息的修改。

### 8.3 git rebase -i ——压缩历史

```bash
git rebase -i
```

通过git rebase -i命令将一些如拼写错误这些"Fix typo"压缩到对应提交信息中，这样使得提交的历史记录更加健全。

## 9.推送至远程仓库

### 9.1 git remote add ——添加远程仓库

首先，在Github上创建仓库，然后通过命令将该仓库设置为本地仓库的远程仓库。

```bash
git remote add origin ....git
#Git会将.git远程仓库的名称设置为origin(标识符)
```

### 9.2 git push——推送至远程仓库

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

## 10. 从远程仓库获取

### 10.1 git clone——获取远程仓库

```bash
git clone .git
```

该命令可将Github远程仓库的内容clone到本地。

### 10.2 git pull——获取最新的远程仓库分支

```bash
git pull
```

用git pull命令将本地的分支更新到最新状态。
Github端远程仓库中的某分支是最新状态，所以本地仓库中的该分支就得到了更新。
