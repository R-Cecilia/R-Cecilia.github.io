---
title: "3. Git 历史：回溯、修改与整理提交"
chapter_title: "Git 历史：回溯、修改与整理提交"
weight: 3

date: 2026-09-10T11:10:00+08:00
lastmod: 2026-09-10T11:10:00+08:00

categories: ["Git"]
tags: ["Git", "reset", "amend", "rebase"]
description: "Git 历史：回溯、修改与整理提交学习笔记。"
---

## 更改提交操作

### git reset ——回溯历史版本

通过git reset --hard命令，只需要提供目标时间点的哈希值，就可以完全恢复到该时间点的状态。

```bash
git reset --hard 哈希值
```

回溯、推进历史，合并过程中可能存在冲突(Conflict)，此时必须打开编辑器对冲突部分进行编辑。

### git commit --amend ——更改提交信息

通过git commit --amend 修改提交信息。

```bash
git commit --amend
```

命令执行后，编辑器就会启动，修改之前的提交信息，保存文件，关闭编辑器，即可完成提交信息的修改。

### git rebase -i ——压缩历史

```bash
git rebase -i
```

通过git rebase -i命令将一些如拼写错误这些"Fix typo"压缩到对应提交信息中，这样使得提交的历史记录更加健全。
