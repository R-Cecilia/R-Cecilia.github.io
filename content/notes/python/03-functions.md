---
title: "3. Python 函数：参数、作用域与装饰器"
chapter_title: "Python 函数：参数、作用域与装饰器"
weight: 3

date: 2026-09-06T11:10:00+08:00
lastmod: 2026-09-06T11:10:00+08:00

categories: ["Python"]
tags: ["函数", "参数", "作用域", "装饰器"]
description: "Python 函数：参数、作用域与装饰器学习笔记。"
---

## 函数

### 参数类型

```py
# 位置参数(必须参数)
def greet(name,age):
    pass

#默认参数
def greet(name,age=25):
    pass
greet("R",20)
# 注意：默认参数必须在非默认参数之后

#关键字参数
#使用关键字参数时。顺序可以改变
def greet(name,age=25):
    pass
greet(age=20,name="R")

#混合使用
greet("R",age=15)
#混合使用时，位置参数必须在关键字参数之前

#可变参数*args
#*args可以接受任意数量的参数
def all_sum(*args): #args是一个元组
    sum=0
    for num in args:
        sum+=num
    return sum

#关键字可变参数**kargs
def print_info(**kargs): #kargs是一个字典
    for key,value in kargs:
        print(f"{key}:{value}")

#参数混合使用
def complex_function(a, b, *args, c=10, d=20, **kwargs):
    print(f"a={a}, b={b}")
    print(f"args={args}")
    print(f"c={c}, d={d}")
    print(f"kwargs={kwargs}")

complex_function(1, 2, 3, 4, 5, c=100, e=200, f=300)
# a=1, b=2
# args=(3, 4, 5)
# c=100, d=20
# kwargs={'e': 200, 'f': 300}
```

### 返回值

```py
#单个返回值
def square(x):
    result=x**2
    return result

#多个返回值
def get_min_max(numbers):
    return min(numbers), max(numbers)

min_num, max_num = get_min_max([5, 2, 8, 1, 9])
print(f"最小: {min_num}, 最大: {max_num}")  # 最小: 1, 最大: 9

result = get_min_max([5, 2, 8, 1, 9]) # 也可以接收为元组
print(result)  # (1, 9)

#无返回值,默认返回None
#可以提前返回
```

### 作用域

局部变量、全局变量、global声明全局变量、nonlocal嵌套函数中使用

### Lambda函数

```py
lambda 参数 : 表达式

numbers = [3, 1, 4, 1, 5, 9, 2]
sorted_numbers = sorted(numbers, key=lambda x: -x)
print(sorted_numbers)  # [9, 5, 4, 3, 2, 1, 1]
```

### 函数的高级特性

#### 递归函数

```py
#举例:计算阶乘

def factorial(x):
    if(x<=1)
        return 1
    return factorial(x-1)*x
```

#### 装饰器(Decorator)

装饰器本质上是一个函数，它接收一个函数作为参数，并返回一个新的函数。给函数增加新功能，但不修改原函数的代码。

```py
import time

def timer_decorator(func):
    """计时装饰器"""
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} 耗时: {end - start:.4f}秒")
        return result
    return wrapper

@timer_decorator
def slow_function():
    time.sleep(1)
    return "完成"

result = slow_function()
# slow_function 耗时: 1.0001秒
print(result)  # 完成
```

#### 文档字符串(Docstring)

函数的描述文档

```py
def calculate_area(length, width):
    """
    计算矩形的面积。

    参数:
        length (float): 矩形长度
        width (float): 矩形宽度

    返回:
        float: 矩形面积
    """
    return length * width

# 查看文档
print(calculate_area.__doc__)
help(calculate_area)
```
