---
title: "26fall-w3-面向对象编程"

date: 2026-09-14T11:10:00+08:00
lastmod: 2026-09-14T11:10:00+08:00

categories: ["Python"]
tags: ["类和对象", "属性", "方法"]
description: "介绍基本的类和对象的知识，包括属性、方法等内容，尤其对于实例方法、类方法和静态方法做了区分"

cover: /images/cover4.webp
---

# 面向对象编程

## 1 什么是面向对象编程

面向对象编程（Object-Oriented Programming，OOP） 是一种编程范式，它把程序看作一组对象的集合，每个对象都有自己的数据（属性）和行为（方法）。

用对象模拟现实中的事物，每个对象既包含数据，也包含操作数据的方法。

## 2 基础

### 2.1 类和对象

```py
#类
class a:
    pass
# 实例
a1=a()
```

### 2.2 属性和方法

属性就是对象存储的数据，方法是定义在类中的函数，用于描述对象的行为。
|
实例属性和类属性（一个由每个实例单独赋值，另一个是所有实例共有的属性）
程序查找规则：先查实例属性，再找类属性
|
为了避免每次创建实例都要对实例属性单独赋值，引入**init**方法

### 2.3 init方法

init为每一个实例的属性设置初始属性，创建实例时会自动调用

```py
class Animal:
    def __init__(name,age,species="a"):
        self.name=name
        self.age=age
        self.species=species
```

self代表当前实例本身，是实例方法的第一个参数
this也可以代替self，但对于Python而言约定俗成使用self

### 2.4 方法

实例方法第一个参数是self
类方法(@classmethod)操作类本身，第一个参数是cls
静态方法(@staticmethod)无需self或者cls，就是普通函数

**在定义时，实例方法必须显式写 self，类方法必须显式写 cls；但在调用时，Python 会自动传入，不需要手动传。**
