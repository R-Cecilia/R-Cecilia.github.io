---
title: "1. C++ 异常处理、STL 与测试调试"
chapter_title: "C++ 异常处理、STL 与测试调试"
weight: 1

date: 2026-07-05T11:10:00+08:00
lastmod: 2026-07-05T13:10:00+08:00

categories: ["C++"]
tags: ["异常", "STL", "测试与调试"]
description: "C++ 异常处理、STL 与测试调试学习笔记。"
url: "/post/26summer-w1-c++特性/"
---

## 异常

### 抛出异常

异常表示程序出现的错误信息。

```C++
#抛出一个类型为char*的异常
int abc(int a,int b,int c)
    {
        if(a<=0||b<=0||c<=0)
            throw "All paremeters should be > 0";
        return a+b*c;
    }
```

### 处理异常

一段代码抛出的异常由包含这段代码的try块来处理。紧跟在try块后的是catch块。  
每一个catch块都有一个参数，参数的类型决定了这个catch块要捕捉的异常类型。

```C++
catch(char *e){}
#捕捉的异常类型是char*
catch(...){}
#捕捉所有异常
```

捕捉一个类型为char \*的异常

```C++
int main()
{
    try{cout<<abc(2,0,4)>>endl;}
    catch (char*e)
        {
            cout<<"An exception has been thrown">>;
            return 1;
        }
    return 0;
}
# abc抛出异常，函数计算与try块停止。异常被catch捕捉，进入catch块
```

## 标准模板库(STL)

C++标准模板库(STL)是一个容器，适配器，迭代器，函数对象和算法合集。有效使用STL，应用程序的设计会简单许多。

## 测试与调试

设计测试数据的技术：

- 黑盒法:黑盒法主要考察函数的功能而非实际代码，I/O分类和因果图。
- 白盒法:白盒法基于代码来设计测试数据。对一个测试集的基本要求是使得程序的每一条语句都至少执行一次，即实现语句覆盖。
