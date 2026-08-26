---
title: "Python文件的读写"

date: 2025-05-02T11:10:00-15:00
lastmod: 2025-05-02T11:10:00-15:00

categories: ["Python"]
tags: ["Python", "文件读写"]
description: "Python读取(read)，写入(write)等"

cover: /images/cover5.png
---

# Python---文件的读写

### 文件的读取

```python
{
    File_Name=open(file,mode,encoding)#打开文件获取文件对象
    File_Name.read(num)#读取指定字节长度,不指定则读取全部内容
    File_Name.readline()#读取一行
    File_Name.readlines()#读取全部行,形成列表
    for line in File_Name#循环全部行,每一次循环读取一行
    File_Name.close()关闭文件
    with open(file,mode,encoding) as f#通过with.open读取,可以自动关闭
}
```

**注:**
mode一般包含三种:
"r":只读;"w":写入(覆盖过往内容);"a":追加写入(不覆盖过往内容)

### 文件的写入

```python
{
    File_Name.write()#write写入
    File_Nume.writelines()##写入多行
    File_Name.flush()#使写入内容从缓冲区保存到硬盘中
    #根据mode模式不同,可以分为写出和追加写入,可以通过"\n"来进行换行操作
}
```
