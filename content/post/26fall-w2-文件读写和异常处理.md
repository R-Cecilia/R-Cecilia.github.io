---
title: "Python文件读写"

date: 2026-09-06T11:10:00+08:00
lastmod: 2026-09-06T11:10:00+08:00

categories: ["Python"]
tags: ["文件读写", "JSON处理", "异常"]
description: "Python文件读写、JSON基础和异常处理"

cover: /images/cover3.webp
---

# 文件读写和异常处理

## 1 文件读写

### 1.1 文件操作的基本流程

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

### 1.2 with语句

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

### 1.3 read()

read()读取整个文件 参数设置读取的字符数
readline()逐行读取
readlines()读取行为列表 返回一个包含末尾换行符\n的列表，可以使用strip()去掉换行符

```py
#还可以直接读取文本
with open("text.txt","r",encoding="utf-8") as f:
    for line in f:
        print(line.strip()) #逐行处理
```

### 1.4 write()

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

## 2 JSON

### 2.1 JSON的基本格式

```json
{
  "name": "Alice",
  "age": 25,
  "is_student": false,
  "hobbies": ["reading", "coding", "swimming"],
  "address": {
    "city": "Beijing",
    "street": "Main Street"
  }
}
```

### 2.2 dumps()和dump()

dump()将Python对象写入json
dumps()将Python对象转换为字符串

```py
import json

# Python 对象
person = {
    "name": "Alice",
    "age": 25,
    "is_student": False,
    "hobbies": ["reading", "coding"],
    "address": {"city": "Beijing", "street": "Main St"}
}

# 转换为 JSON 字符串
json_string = json.dumps(person)
print(json_string)
# {"name": "Alice", "age": 25, "is_student": false, "hobbies": ["reading", "coding"], "address": {"city": "Beijing", "street": "Main St"}}

# 美化输出（缩进）
pretty_json = json.dumps(person, indent=4)
print(pretty_json)

"""
常用参数:
indent：缩进（美化）
sort_keys：按键排序
ensure_ascii：处理中文  默认 True 会将中文转义为 \uXXXX ensure_ascii=False 保持中文可读
"""

#dump()写入文件
data = {
    "students": [
        {"name": "Tom", "score": 95},
        {"name": "Alice", "score": 89},
        {"name": "Jack", "score": 92}
    ]
}

# 写入 JSON 文件
with open("students.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print("数据已写入 students.json")
```

### 2.3 loads()和laod()

loads()将字符串解析为Python对象
load()将json文件解析为Python对象

```py
import json

#loads()
# JSON 字符串
json_string = '{"name": "Alice", "age": 25, "is_student": false}'

# 解析为 Python 对象
person = json.loads(json_string)
print(person)  # {'name': 'Alice', 'age': 25, 'is_student': False}
print(type(person))  # <class 'dict'>
print(person["name"])  # Alice

#load()
# 从文件读取 JSON
with open("students.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(data)
print(data["students"][0]["name"])  # Tom

# 遍历数据
for student in data["students"]:
    print(f"{student['name']}: {student['score']}")
```

## 3 异常处理

### 3.1 基本语法链

try-except-else-finally

```py
try:
    # 可能出错的代码
    pass
except SomeException:
    # 处理特定异常
    pass
else:
    # 没有异常时执行
    pass
finally:
    # 无论是否异常都执行
    pass
```

### 3.2 raise

主动抛出异常

```py
#基本用法
if age<0 or age > 150 :
    raise ValueError(f"年龄超出合理范围")

#重新抛出异常
try:
    # 一些操作
    raise ValueError("原始错误")
except ValueError as e:
    print(f"记录日志: {e}")
    raise  # 重新抛出相同的异常

#自定义异常
class InsufficientFundsError(Exception):
    """余额不足异常"""
    pass

class BankAccount:
    def __init__(self, balance):
        self.balance = balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError(f"余额不足：需要 {amount}，当前 {self.balance}")
        self.balance -= amount
        return amount

# 使用
account = BankAccount(100)
try:
    account.withdraw(150)
except InsufficientFundsError as e:
    print(f"交易失败: {e}")
```
