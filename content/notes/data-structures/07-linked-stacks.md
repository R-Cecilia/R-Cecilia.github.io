---
title: "7. 栈：链表实现"
chapter_title: "栈：链表实现"
weight: 7

date: 2026-07-24T13:10:00+08:00
lastmod: 2026-07-24T15:13:00+08:00

categories: ["数据结构"]
tags: ["栈", "链式栈"]
description: "栈：链表实现学习笔记。"
---

## 链表描述

### 派生类derivedLinkedStack

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

### 类linkedStack

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
