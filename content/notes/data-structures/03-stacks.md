---
title: "6. 栈：基本概念与数组实现"
chapter_title: "栈：基本概念与数组实现"
weight: 6

date: 2026-07-24T13:10:00+08:00
lastmod: 2026-07-24T15:13:00+08:00

categories: ["数据结构"]
tags: ["栈", "数组栈"]
description: "栈：基本概念与数组实现学习笔记。"
url: "/post/26summer-w5-栈/"
---

## 基本知识

定义:栈(stack)是一种特殊的线性表，其插入(入栈)和删除(出栈)操作都在栈的同一端进行。这一端即为栈顶(top)，另一端称为栈低(bottom)。
关键:**后进先出**

## 代码实现

```C++
template<class T>
class stack
{
    public:
    virtual ~satck()
    virtual bool empty() const=0;//当且仅当栈为空，返回true
    virtual int size() const=0;//返回栈中的元素个数
    virtual T& top() =0;//返回栈顶元素的引用
    virtual void pop() =0;//删除栈顶元素
    virtual void push(const T& theElement)=0;//将元素theElement压入栈顶
}
```

## 数组描述

### 作为派生类的实现

```C++
//直接从arrayList和stack派生的类derivedArrayStack
template<class T>
class derivedArrayStack : private arrayList<T> public stack<T>
{/*arrayList的派生类derivedArrayStack具有访问权限修饰符private。因此，类derivedArrayStack可以访问arrayList的公有和保护性方法以及数据成员。
但stack的用户不能访问arrayList的方法get、erase、insert*/
    //详细略
};
```

### 类arrayStack实现

```C++
template<class T>
class arrayStack:public stack<T>
{
    public:
        arrayStack(int initialCapacity=10);
        ~arrayStack(){delete []stack;}
        bool empty(return stackTop==-1;)
        int size() const
            {return stackTop+1;}
        T& top()
        {
            if(stackTop==-1)
                throw stackEmpty();
            return(stack[stackTop]);
        }
        void pop()
        {
            if(stackTop==-1)
                throw stackEmpty();
            else
                stack[stackTop--].~T();//T的析构函数
        }
        void push(const T& theElement);
        private:
            int stackTop;   //当前栈顶
            int arrayLength;    //栈容量
            T* stack;   //元素数组
};

template<class T>
arrayStack<T>::arrayStack(int initialCapacity)
{//构造函数
    if(initialCapacity<1){
        ostringstream s;
        s<<"initial capacity ="<<initialCapacity<<"Must be > 0";
        throw illegalParameterValue(s.str());
    }
    arrayLength=initialCapacity;
    stack=new T[arrayLength];
    stackTop=-1;
}

template<class T>
void arrayStack<T>::push(const T& theElement)
{//将元素theElement压入栈
    if(stackTop=arrayLength-1){
        changeLength(stack,arrayLength,2 * arrayLength);
        arrayLength *= 2;
    }
    stack[++stackTop]=theElement;
}
```
