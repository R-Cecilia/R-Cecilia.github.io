---
title: "3. C++ 类与对象：封装、重载与继承"
chapter_title: "C++ 类与对象：封装、重载与继承"
weight: 3

date: 2026-07-05T11:10:00+08:00
lastmod: 2026-07-05T13:10:00+08:00

categories: ["C++"]
tags: ["类和对象", "封装", "操作符重载", "友元", "继承"]
description: "C++ 类与对象：封装、重载与继承学习笔记。"
---

## 自有数据类型

### 类和对象

- 通过C++的类结构(class)来定义自有数据类型。
- 类的成员声明有两部分:公有(public)和私有(private)
- 公有部分所声明的是用来操作类对象的成员函数，它们对于类的用户是可见的，是用户与类对象进行交互的唯一手段
- 私有部分是所声明的是用户不可见的数据成员(简单变量、数组以及其他可赋值结构)和成员函数。
- 通过公有和私有部分，我们让用户只看到它们需要看到的部分。

```C++
class currency
{
    public:
    //构造函数
    currency(unsigned long theDollars=0,unsigned int theCents=0);
    //析构函数
    ~currency(){}
    void setValue(unsigned long,unsigned int);

    private:
    unsigned long dollars;
    unsigned int cents;
};
```

### 操作符重载

当一个类中若干个成员函数与C++标准操作符类似。例如，add实施的是+操作.使用这些标准C++操作符比定义新的成员函数更自然。为了使用操作符，进行操作符重载，它可以扩大C++操作符的应用范围，使其操作新的数据类型或类。

### 友元和保护性类成员

在一些应用程序中，我们必须赋予别的类或者函数直接访问该类私有成员的权利，这就需要把这些类或者函数声明为该类的友元。

```C++
class currency
{
    //friend语句总是紧跟在类标题语句之后
    friend ostream& operator<<(ostream&,const currency&);
    public:
}
```

一个类A从另一个类B派生，A是派生类(derived class)，b是基类(base ckss).

```C++
    // 基类（父类）
    class base
    {
        public:
        int a();
        protected:
        int b();
    }

    // 派生类（子类）
    class derived : public base
    {
        public:
        int c();
    }

    derived D;
    D.a();//继承base
    D.c();//derived自己的
```
