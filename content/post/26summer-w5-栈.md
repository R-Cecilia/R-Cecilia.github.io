---
title: "26summer-w5-栈"

date: 2025-07-24T13:10:00+08:00
lastmod: 2025-07-24T15:13:00+08:00

categories: ["数据结构"]
tags: ["栈"]
description: "链表描述和数组描述下的栈"

cover: /images/cover18.jpg
---

# 栈(stack)

## 1. 基本知识

定义:栈(stack)是一种特殊的线性表，其插入(入栈)和删除(出栈)操作都在栈的同一端进行。这一端即为栈顶(top)，另一端称为栈低(bottom)。
关键:**后进先出**

## 2.代码实现

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

## 3.数组描述

### 3.1 作为派生类的实现

```C++
//直接从arrayList和stack派生的类derivedArrayStack
template<class T>
class derivedArrayStack : private arrayList<T> public stack<T>
{/*arrayList的派生类derivedArrayStack具有访问权限修饰符private。因此，类derivedArrayStack可以访问arrayList的公有和保护性方法以及数据成员。
但stack的用户不能访问arrayList的方法get、erase、insert*/
    //详细略
};
```

### 3.2 类arrayStack实现

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

## 4.链表描述

### 4.1 派生类derivedLinkedStack

用链表来描述栈时，我们必须确定哪一端表示栈顶。
当以右端作为栈顶时，需要调用的链表方法get(size()-1)、insert(size(),theElement)和erase(size()-1)。每一个方法用时O(size())。
而用链表左端作为栈顶时，链表方法是get(0)、insert(0,theElement)和erase(0)。每一个方法用时O(1)。
所以选择左端作为栈顶

```C++
/*派生类derivedLinkedStack从chain中派生*/
template<class T>
class erivedLinkedStack:private chain<T> public stack<T>
{
    //内容略
};
```

### 4.2 类linkedStack

```C++
template<class T>
class linkedStack : public stack<T>
{
    public:
        linkedStack(int initialCapacity = 10)
        {stackTop=NULL;stackSize=0;}
        ~linkedStack();
        bool empty() const
        {return stackSize==0;}
        int size() const
        {return stackSize;}
        T& top()
        {
            if(stackStack==0)
                throw stackEmpty();
            return stackTop->element;
        }
        void pop();
        void push(const T& theElement)
        {
            stackTop=new chainNode<T>(the Element,stackTop);//始终从链表左端添加元素(即链表左端是栈顶)
            stackSize++;
        }
        private:
            chainNode<T>* stackTop; //栈顶指针
            int stackSize;  //栈中元素个数
};

template<class T>
linkedStack<T>::~linkedStack()
{//析构函数
    while(stackTop!=NULL){
        chainNode<T>* nextNode=stackTop->next;
        delete stackTop;
        stackTop=nextNode;
    }
}

template<class T>
void linkedStack<T>::pop()
{//删除栈顶节点
    if(stackSize==0)
        throw stackEmpty();

    chainNode<T>* nextNode=stackTop->next;
    delete stackTop;
    stackTop=nextNode;
    stackSize--;
}
```
