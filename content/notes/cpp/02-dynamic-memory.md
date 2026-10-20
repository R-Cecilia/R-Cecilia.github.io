---
title: "2. C++ 动态内存：new、delete 与数组"
chapter_title: "C++ 动态内存：new、delete 与数组"
weight: 2

date: 2026-07-05T11:10:00+08:00
lastmod: 2026-07-05T13:10:00+08:00

categories: ["C++"]
tags: ["动态内存", "new", "delete", "数组"]
description: "C++ 动态内存：new、delete 与数组学习笔记。"
---

## 动态存储空间分配

### 操作符new

```C++
# C++操作符new用来进行动态存储分配或运行时的存储分配，它的值是一个指针，指向所分配空间。
```

### 一维数组

数组的大小在编译时是未知的，它随着函数调用的变化而变化，因此，对这些数组只能进行动态存储分配。

```C++
#创建一个长度为n的一维浮点型数组
float* x=new float[n];
#操作符new为n个浮点数分配了存储空间，并返回第一个浮点数空间的指针。
#对每个数组元素的访问可以用x[0],x[1]...x[n-1]的形式。
```

### 操作符delete

动态分配的存储空间不再需要时应该把它释放，释放的空间可重新用来动态分配。
操作符delete用来释放由操作符new所分配的空间。

```C++
#下列语句用来释放分配给*y和一维数组x的空间
delete y;
delete []x;
```

### 二维数组

用动态空间分配的方法构建二维数组

```C++
#include <iostream>
using namespace std;

void make2darray(int ** &x,int numbersofRow,int numbersofColumns)
{//创建二维数组
    //创建行指针
    x = new int* [numbersofRow];

    //为每一行分配空间
    for(int i=0;i<numbersofRow;i++){
        x[i]=new int [numbersofColumns];
    }
}

void delete2darray(int ** &x,int numberofRow)
{
    //删除行数组空间
    for(int i=0;i<numberofRow;i++)
        delete [] x[i];
    //删除行指针
    delete []x;
    x=NULL;//放置用户访问已被释放的空间
}

int main()
{
    int**x;
    int r=5,c=5;
    try{make2darray(x,r,c);}
    catch(bad_alloc)
    {
        cout<<"could not create x"<<endl;
        exit(1);
    }
    delete2darray(x,c);
}
```
