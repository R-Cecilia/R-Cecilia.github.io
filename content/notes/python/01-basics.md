---
title: "1. Python 基础：类型与流程控制"
chapter_title: "Python 基础：类型与流程控制"
weight: 1

date: 2026-09-06T11:10:00+08:00
lastmod: 2026-09-06T11:10:00+08:00

categories: ["Python"]
tags: ["基本数据类型", "类型转换", "输入输出", "条件与循环"]
description: "Python 基础：类型与流程控制学习笔记。"
url: "/post/26fall-w1-py基础/"
---

## 基本数据类型、类型转换和输入输出

### 基本数据类型

int 整型
float 浮点型
str 字符串
bool 布尔型

### 类型转换

关键字+()
int("1") # 1
float(1) # 1.0
str(105) # "105"
bool(0) # Flase

### print和input

print()可以有多个参数，自动用空格分隔，以换行结束
print("a","b","c") # a b c
print("a","b","c",sep="-") # a-b-c
print("Hello",end="!") # Hello!

格式化输出print-f

```py
name= "Tom"
score=95.5
print(f"My name is {name},My score is {score}")
print(f"My score is {score:.1f}")
```

input接受用户输入，其返回值一定是字符串，故如果需要用到非字符串数据类型，需要进行数据转换
height=float(input("Enter your height"))

## 条件判断语句if/elif/else

if 条件1:
pass # 条件1为True
elif 条件2:
pass # 条件2为True且条件1为Flase
else 条件3:
pass # 条件1和条件2为Flase

## 循环判断语句for/while/range

### for循环

for 变量 in 可迭代对象: #循环体
pass

### range

range()生成数字序列
range(start,stop,step) #起始、终点、步长（起始和步长可选）
range(5) # 0 1 2 3 4
range(2,6) # 2 3 4 5
range(5,0,-1) # 5 4 3 2 1

### while

while 条件: #循环体
break # 跳出循环
conitnue # 进入下一次循环
else # 循环均不满足的时候执行

```py
numbers=[1,2,3,4,5]
for i in numbers:
    if i==6:
        print("找到了")
        break
else:
    print("未找到")
```
