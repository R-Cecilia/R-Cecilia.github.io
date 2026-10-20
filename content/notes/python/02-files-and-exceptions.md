---
title: "5. Python 文件读写：open、with 与读写操作"
chapter_title: "Python 文件读写：open、with 与读写操作"
weight: 5

date: 2026-09-06T11:10:00+08:00
lastmod: 2026-09-06T11:10:00+08:00

categories: ["Python"]
tags: ["文件读写", "open", "with"]
description: "Python 文件读写：open、with 与读写操作学习笔记。"
url: "/post/26fall-w2-文件读写和异常处理/"
---

## 文件读写

### 文件操作的基本流程

```py
#打开文件
file=open("file","mode")

#编辑文件
content=file.read()
file.write("write")

#关闭文件
file.close()
#为什么要关闭文件？
#释放系统资源
#确保数据真正写入磁盘
#避免文件被锁定
```

### with语句

with 语句可以自动关闭文件，即使发生异常也能正确关闭。

```py
with open ("file","mode") as file:
    file.read()
```

常见的mode：
r 只读
w 只写 覆盖写入
a 追加 在末尾追加
r+ 从头读写
w+ 清空后读写
a+ 末尾写入/读写

encoding参数指定编码 encoding="utf-8"

### read()

read()读取整个文件 参数设置读取的字符数
readline()逐行读取
readlines()读取行为列表 返回一个包含末尾换行符\n的列表，可以使用strip()去掉换行符

```py
#还可以直接读取文本
with open("text.txt","r",encoding="utf-8") as f:
    for line in f:
        print(line.strip()) #逐行处理
```

### write()

write()写入 w覆盖原有内容 a末尾添加

writelines()写入多行，传入参数是一个列表
注：writelines()不会自动换行

```py
lines=["Hello\n","Python\n"]
with open("text.txt","w",encoding="utf-8") as f:
    f.writelines(lines)
# Hello
# Python
```

print也可以写入文件

```py
with open("text.txt","a",encoding="utf-8") as f:
    print("Hello",file=f) #自动换行
    print("World",file=f) #此时终端不会再显示打印内容
```
