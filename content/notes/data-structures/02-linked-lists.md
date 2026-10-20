---
title: "2. 链表结构：单向、循环与双向链表"
chapter_title: "链表结构：单向、循环与双向链表"
weight: 2

date: 2026-07-18T13:10:00+08:00
lastmod: 2026-07-18T15:13:00+08:00

categories: ["数据结构"]
tags: ["链表", "单向链表", "循环链表", "双向链表"]
description: "链表结构：单向、循环与双向链表学习笔记。"
url: "/post/26summer-w4-线性表链式描述/"
---

## 单向链表

### 描述

在链式描述中，数据对象的实例的每一个元素都用一个单元或者一个节点来描述。节点不必是数据成员，因此不是用公式来确定元素的位置。
实际上，每一个节点都明确包含另一个相关节点的位置信息，这个信息称为指针(pointer)或者链(link)。

设L是一个线性表，在这个线性表可能的一种链式描述中，每个元素都在单独的一个节点中描述，每个节点都有一个链域，它的值是线性表的下一个元素的位置，即地址。

当每一个节点只有一个链，这种结构称为单向链表(singly linked)。链表从左到右，每一个节点(除最后一个节点)都链接者下一个节点，最后一个节点的链域值为NULL。这样的结构也称为链条(chain)。

### 结构chianNode

定义一个chainNode结构，从而为单向链表的节点定义了数据类型。

```C++
template<class T>
struct chainNode{
    //数据成员
    T element;//element是节点的数据域，储存表的元素
    chainNode<T> *next;//next是节点的链域，是一个指向chainNode数据类型的指针

    //方法
    chainNode(const& T element){
        this->element=element;
    }
    chainNode(const& T element,chainNode<T> *next){
        this->element=element;
        this->next=next;
    }
    //结构chainNode的构造函数用了this指针，这是因为对象的数据成员和函数形参同名，只有使用这种语法才能把它们区分开。
    //补充:通过使用 this 指针，我们可以在成员函数中访问当前对象的成员变量，即使它们与函数参数或局部变量同名，这样可以避免命名冲突，并确保我们访问的是正确的变量。
}
```

### 类chain

#### 链表chain的构造函数、复制构造函数和析构函数

```C++
template<class T>
chain<T>::chain(int initialCapacity)
{//构造函数
    if(initialCapaciy<1)
            throw illegalParameterValue();//抛出异常，具体内容略
    firstNode=NULL;
    listSize=0;
}

template<class T>
chain<T>::chain(const chain<T>& theList)
{//复制构造函数
    listSize=theList.listSize;

    if(listSize==0){//链表为空
        firstNode=NULL;
        return;
    }

    //链表非空
    chianNode<T>* sourceNode=theList.firstNode;
    firstNode=new chainNode<T>(sourceNode->element);
    sourceNode=sourceNode->next;
    chianNode<T>* targetNode=firstNode;
    while(sourceNode!=NULL){
        targetNode->next=new chainNode<T>(sourceNode->element);
        targetNode=targetNode->next;
        sourceNode=sourceNode->next;
    }
    targetNode->next=NULL;
}

chain<T>::~chain()
{//链表析构函数,删除链表的所有节点
    while(firstNode!=NULL){
        chainNode<T>*nextNode=firstNode->next;
        delete firstNode;
        firstNode=nextNode;
    }
}
```

#### 链表的get

```C++
template<class T>
T& chain<T>::get(int theIndex) const
{
    chainNode<T>*currentNode=firstNode;
    for(int i=0;i<theIndex;i++){
        currentNode=currentNode->next;
    }
    return(currentNode->element);
}
```

#### 链表的indexOf

```C++
template<class T>
int chain<T>::indexOf(const& T theElement) const
{//返回元素theElement首次出现时的索引
 //若元素不存在，则返回-1

    chainNode<T>* currentNode=firstNode;
    int index=0;

    while(currentNode!=NULL&&currentNode->element!=theElement){
        currentNode=currentNode->next;
        index++;
 }
    if(currentNode==NULL)
        return -1;
    else
        return index;
}
```

#### 链表的erase

```C++
template<class T>
void chain<T>::erase(int theIndex)
{//删除索引为theIndex的元素
    chainNode<T>* deleteNode;
    if(theIndex=0){
        deleteNode=firstNode;
        firstNode=firstNode->next;
    }
    else{//用指针*p指向要删除的节点的前驱节点
    chainNode<T>* p=firstNode;
    for(int i=0;i<theIndex-1;i++)
        p=p->next;
    deleteNode=p->next;
    p->next=deleteNode->next;
    }
    delete deleteNode;
    listSize--;
}
```

#### 链表的insert

```C++
template<class T>
void chain<T>::insert(int theIndex,cosnt T& theElement)
{//在theIndex位置插入元素theElement
    if(theIndex==0){
        firstNode=new chainNode<T>(theElement,firstNode);
    }
    else{
        chainNode<T>* p=firstNode;
        for(int i=0;i<theIndex-1;i++)
            p=p->next;
        p->next=new chianNode<T>(theElement,p->next);
    }
    listSize++;
}
```

## 循环链表与头节点

应用下面两条措施可以使得链表的应用代码简洁而高效

1. 把线性表描述成一个单向循环链表，而不是单向链表。
2. 在链表前面增加一个节点，称为头节点(header Node),只要将单向链表的尾节点与头节点链接起来，单向链表就成为了循环链表。

## 双向链表

每个元素节点既有指向后继的指针，又有指向前驱的指针，双向链表就是这样一个有序的节点序列。
每一个节点都有两个指针next和previous。next指针指向右边节点，previous指针指向左边节点。
