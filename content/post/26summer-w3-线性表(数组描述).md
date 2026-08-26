---
title: "26summer-w3-线性表(顺序描述)"

date: 2025-07-12T13:10:00+08:00
lastmod: 2025-07-12T15:13:00+08:00

categories: ["数据结构"]
tags: ["线性表", "数组", "C++迭代器", "vector"]
description: "数组描述下的线性表"

cover: /images/cover16.jpg
---

# 线性表(数组描述)

## 1. 数据对象和数据结构

数据对象是一组实例或者值，例如:

1. letter={a,b,c,d...x,y,z}
2. digit={0,1,2,3,4,5,6,7,8,9}
3. naturalNumber={0,1,2,3...}
4. string={a,b,c,d,aa,bb,cc,dd...}

- **数据对象(data object)**的一个实例，要么是不可再分的**原子**，要么是由另一个数据对象的实例作为成员复合而成的，这些成员称之为**元素**。
- **数据结构(data structure)**是一个数据对象，同时这个对象的实例以及构成实例的元素都存在着联系，而且这些联系都由相关的函数来规定。
- 研究数据结构，我们关心的是数据对象的描述以及相关函数的具体实现。

## 2. 线性表数据结构

- 线性表(linear list)的每一个实例都是元素的一个有序集合。每一个实例的形式为(e0,e1,e2...e(n-1)),其中n是有穷自然数，也是线性表的长度或者大小，ei是线性表的元素，i是元素的索引。
- e(0)是线性表的首元素，e(n-1)是线性表的最后一个元素，可以认为:e0先于e1,e2先于e(n-1)这种先后关系是线性表的唯一关系。

## 3.数组描述

### 3.1 描述

数组描述的线性表指的是用数组来存储线性表中的元素，一般一个实例用用一个数组来存储。

### 3.2 类arraylist的实现

- 我们定义一个C++抽象类linearList的派生类arrayList.
- 因为arrayList是一个具体类，所以它必须实现抽象类linearLsit的所有方法。
- 不仅如此它还应该包含基类linearList没有声明的方法。

```C++
template<class T>
class arrayList : public linearList<T>
{
    public:
    //构造函数、复制构造函数和析构函数
        arrayList(int initialCapacity=10);
        arrayList(const arrayList<T>&);
        ~arrayList(){delete [] element;}

    //ADT方法
        bool empty(){return listSize==0;}
        int size() const{return listSize;}
        T& get(int theIndex) const;
        int indexOf(const T& theElement) const;
        void erase(int theIndex);
        void insert(int theIndex,const T& theElement);
        void output(ostream& out) const;

    //其他方法
        int capacity() const{return arrayLength;}
    protected:
        void checkIndex(int theIndex) const;
            //若索引theIndex无效，则抛出异常。
            T* element; //存储线性表元素的一维数组
            int listSize; //线性表的元素个数
            int arrayLength; //一维数组的容量
}
```

## 4. C++迭代器

- 一个迭代器(iterator)是一个指针，指向对象的一个元素。
- 迭代器可以用来逐个访问对象的所有元素。

```C++
{
int main()
{
    int x[3]={0,1,2}
    //用指针y遍历数组x
    for(int*y=x;y!=x+3;y++)
        cout<<*y<<endl;
}
}
```

- C++的STL定义了五种迭代器:输入、输出、向前、双向和随机访问。

## 5.vector的描述

vector可以根据数组长度动态增加

```C++
//使用 vector 前，需要包含头文件：
#include <vector>
///创建一个vector,并指定大小
std::vector<int>vec(5);
//使用 push_back() 向尾部添加元素：
vec.push_back(100);
//获取大小
vec.size();//size：当前元素数量。
vec.capacity();//capacity：当前已分配的内存容量。
//删除元素
vec.erase(vec.begin() + 2);//删除第三个元素：
```

关于内存分配:
当 vector 空间不足时，会发生扩容：

1. 申请更大的内存
2. 复制旧元素
3. 释放旧内存

为了避免频繁扩容，可以提前分配内存：

```C++
std::vector<int>vec;
vec.reserve(1000000);
```

这样可以减少：

1. 内存重新分配
2. 元素复制
3. 性能损耗
