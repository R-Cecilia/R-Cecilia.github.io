---
title: "1. Git 基础：仓库、提交与状态检查"
chapter_title: "Git 基础：仓库、提交与状态检查"
weight: 1

date: 2026-09-10T11:10:00+08:00
lastmod: 2026-09-10T11:10:00+08:00

categories: ["Git"]
tags: ["Git", "仓库", "提交", "状态检查"]
description: "Git 基础：仓库、提交与状态检查学习笔记。"
url: "/post/26fall-w2-git基础/"
---

## git init ——初始化仓库

要使用Git进行版本管理必须先 初始化仓库。建立一个目录，在该目录下创建仓库。

```bash
git init
```

## git status ——查看仓库状态

git status 用于显示Git仓库状态

```bash
git status
```

该命令显示了当前所处的分支以及可提交的内容

## git add ——向暂存区中添加文件

要让文件成为Git仓库的管理对象，需要用git add命令将其加入暂存区。暂存区是提交之前的一个临时区域。

## git commit ——保存仓库的历史记录

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

## git log ——查看提交日志

git log命令可以查看以往仓库的提交日志，包括可以查看什么人在什么时候进行了提交或合并，以及操作前后有怎样的差别。

```bash
git log
```

命令执行后会显示哈希值、Author、Date和提交信息
git log命令可以利用多种参数，查文档即可。

## git diff ——查看更改前后的差别

git diff可以查看工作区、暂存区、最新提交之间的差别。

```bash
git diff
```

```bash
git diff HEAD
```

HEAD是指向当前分支最新一次提交的指针，可以查看本次提交与上次提交之间有什么差别。
