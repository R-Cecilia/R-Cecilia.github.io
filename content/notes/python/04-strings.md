---
title: "4. Python 字符串：拆分、拼接与查找"
chapter_title: "Python 字符串：拆分、拼接与查找"
weight: 4

date: 2026-09-06T11:10:00+08:00
lastmod: 2026-09-06T11:10:00+08:00

categories: ["Python"]
tags: ["字符串", "split", "join", "strip", "replace", "find"]
description: "Python 字符串：拆分、拼接与查找学习笔记。"
---

## 字符串

不可变，可迭代，有序

### split()

分割字符串
无参-默认按空格分割
单参-以传入的作为分割点
双参-传入分割次数

```py
# 处理用户输入
user_input = input("请输入多个数字，用空格分隔: ")
numbers = [int(x) for x in user_input.split()]
print(f"数字列表: {numbers}")
print(f"总和: {sum(numbers)}")

# 解析日志
log = "2024-01-15 10:30:45 ERROR Database connection failed"
parts = log.split(" ", 3)
date = parts[0]
time = parts[1]
level = parts[2]
message = parts[3]
print(f"日期: {date}, 时间: {time}")
print(f"级别: {level}")
print(f"消息: {message}")
```

### join()

join() 将可迭代对象（列表、元组等）中的字符串元素连接成一个字符串。

```py
# 生成 CSV 行
data = ["Alice", "25", "Beijing", "Engineer"]
csv_line = ",".join(data)
print(csv_line)  # Alice,25,Beijing,Engineer

# 生成 HTML 列表
items = ["苹果", "香蕉", "橙子"]
html = "<ul>" + "".join(f"<li>{item}</li>" for item in items) + "</ul>"
print(html)
# <ul><li>苹果</li><li>香蕉</li><li>橙子</li></ul>

# 文件路径拼接
path_parts = ["home", "user", "documents", "file.txt"]
path = "/".join(path_parts)
print(path)  # home/user/documents/file.txt
```

### strip()

strip() 去除字符串两端的空白字符（或指定字符）.

```py
字符串.strip(字符)
字符串.lstrip(字符)  # 只去除左边
字符串.rstrip(字符)  # 只去除右边
# 默认去除空格、制表符、换行符

# 清理用户输入
username = input("请输入用户名: ").strip()
if username:
    print(f"欢迎，{username}!")
else:
    print("用户名不能为空")

# 处理文件读取
with open("data.txt") as f:
    for line in f:
        line = line.strip()  # 去除换行符
        if line:  # 跳过空行
            print(line)
```

### replace()

replace() - 替换字符串

```PY
text = "  Hello, World!  "
# 多个操作链式调用
result = text.strip().replace("World", "Python").replace("Hello", "Hi")
print(result)  # Hi, Python!

# 实际应用：清理文本
def clean_text(text):
    """清理文本"""
    return (text.strip()
                .replace("\n", " ")
                .replace("\t", " ")
                .replace("  ", " "))  # 注意：这只替换一次双空格

text = "  Hello\n\tWorld  Python  "
cleaned = clean_text(text)
print(cleaned)
```

### find()

find() 返回子字符串第一次出现的索引，找不到返回 -1。

```py
# 检查文件扩展名
filename = "document.pdf"
if filename.find(".pdf") != -1:
    print("这是PDF文件")
else:
    print("不是PDF文件")

# 更Pythonic的方式
if filename.endswith(".pdf"):
    print("这是PDF文件")

# 提取邮箱用户名
email = "alice@example.com"
at_pos = email.find("@")
if at_pos != -1:
    username = email[:at_pos]
    domain = email[at_pos+1:]
    print(f"用户名: {username}, 域名: {domain}")
```

### example

```py
# 解析CSV行
def parse_csv_line(line):
    """解析CSV行"""
    return [field.strip() for field in line.split(",")]

csv_data = "Alice, 25, Beijing, Engineer"
fields = parse_csv_line(csv_data)
print(fields)  # ['Alice', '25', 'Beijing', 'Engineer']

# 生成CSV行
def to_csv_line(fields):
    """生成CSV行"""
    return ",".join(str(field) for field in fields)

data = ["Bob", 30, "Shanghai", "Doctor"]
csv_line = to_csv_line(data)
print(csv_line)  # Bob,30,Shanghai,Doctor
```
