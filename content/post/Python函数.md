---
title: "Python函数"

date: 2025-05-01T11:08:00-10:00
lastmod: 2025-05-01T11:08:00-10:00

categories: ["Python"]
tags: ["Python", "函数"]
description: "Python函数有关内容"

cover: /images/cover3.png
---

# Python函数

## 1. 函数的定义

```python
{
    #函数定义(无需声明)
    def calc(a,b):
        return a+b

    #无返回值函数
    def message(msg):
        print(msg)

    #不支持重载，用默认参数实现重载功能
    def greet(name, greeting="Hello"):
        return f"{greeting}, {name}!"

    #类型提示
    def add(x: int, y: int) -> int:
        return x + y

    #调用函数
    result = calc(5, 3) # result = 8
    message("Hello, World!") # 输出: Hello, World!
    greeting_message = greet("Alice") # greeting_message = "Hello, Alice!"
    added_value = add(10, 20) # added_value = 30

}
```

## 2. 参数传递

```python
{
#python中参数传递是通过引用传递的，这意味着当你将一个可变对象（如列表或字典）作为参数传递给函数时，函数内部对该对象的修改会影响到函数外部的对象。
def modify_immutable(x):
    x=100
def modify_list(lst):
    lst.append(4)

#使用
a=10
lst=[1,2,3]
modify_immutable(a)
print(a) # 输出: 10 (a的值没有改变)
modify_list(lst)
print(lst) # 输出: [1, 2, 3, 4] (lst的值被修改了)

'''
关键:可变和不可变对象的区别在于是否可以修改对象本身的内容。
不可变对象（如整数、字符串、元组）不能修改其内容，
而可变对象（如列表、字典、集合）可以修改其内容。
'''
}
```

## 3. 关键字参数

```python
{
    #关键字参数允许你在调用函数时使用参数名称来指定参数的值，这样可以提高代码的可读性。
    def creat_user(name,age=18,role="user")

    #位置调用
    creat_user("Alice",25,"admin")

    #关键字调用(顺序任意)
    creat_user(name="Bob",role="editor")

    #混合调用(位置参数在前)
    creat_user("Eve",role="admin")

    #参数解包(unpacking)
    arg=["Eve",30,"admin"]#(解包列表或元组)
    create_user(*arg) #解包为位置参数
    kwargs={"name":"Frank","role":"superuser"}#(解包字典)
    create_user(**kwargs) #解包为关键字参数

#四种参数混用，位置参数在前，然后是关键字参数，最后依次是*和**可变参数。
}
```

## 4. 返回值:多值返回

```python
{
    def divide(a,b):
        return a//b,a%b
    quoient,reminder=divide(17,5)
    # Python实际返回一个元组，然后自动解包到多个变量，这让代码更加清晰易读。
}
```

## 5. Lambda表达式

```python
{
'''
基本语法
lambda 参数:表达式
'''

#简单Lambda
add=lambda a,b:a+b

#单参数
square=lambda a:a**2

#与内置函数结合
numbers=[1,2,3,4,5]
#map:对每个元素应用函数
squares=list(map(lambda x:x**2,numbers))
#filter
evens=list(filter(lambda x:x%2==0,numbers))
}
```
