---
title: "6. JSON：序列化与反序列化"
chapter_title: "JSON：序列化与反序列化"
weight: 6

date: 2026-09-06T11:10:00+08:00
lastmod: 2026-09-06T11:10:00+08:00

categories: ["Python"]
tags: ["JSON", "序列化", "反序列化"]
description: "JSON：序列化与反序列化学习笔记。"
---

## JSON

### JSON的基本格式

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

### dumps()和dump()

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

### loads()和laod()

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
