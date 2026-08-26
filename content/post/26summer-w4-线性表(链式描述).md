---
title: "26summer-w4-线性表(链式描述)"

date: 2025-07-18T13:10:00+08:00
lastmod: 2025-07-18T15:13:00+08:00

categories: ["数据结构"]
tags: ["线性表", "链表", "箱子排序", "基数排序"]
description: "链表描述下的线性表和相关的应用，包括箱子排序和基数排序"

cover: /images/cover17.webp
---

# 线性表(链式描述)

## 1.单向链表

### 1.1 描述

在链式描述中，数据对象的实例的每一个元素都用一个单元或者一个节点来描述。节点不必是数据成员，因此不是用公式来确定元素的位置。
实际上，每一个节点都明确包含另一个相关节点的位置信息，这个信息称为指针(pointer)或者链(link)。

设L是一个线性表，在这个线性表可能的一种链式描述中，每个元素都在单独的一个节点中描述，每个节点都有一个链域，它的值是线性表的下一个元素的位置，即地址。

当每一个节点只有一个链，这种结构称为单向链表(singly linked)。链表从左到右，每一个节点(除最后一个节点)都链接者下一个节点，最后一个节点的链域值为NULL。这样的结构也称为链条(chain)。

### 1.2 结构chianNode

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

### 1.3 类chain

#### 1.3.1 链表chain的构造函数、复制构造函数和析构函数

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

#### 1.3.2 链表的get

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

#### 1.3.3 链表的indexOf

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

#### 1.3.4 链表的erase

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

#### 1.3.5 链表的insert

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

## 2.循环链表与头节点

应用下面两条措施可以使得链表的应用代码简洁而高效

1. 把线性表描述成一个单向循环链表，而不是单向链表。
2. 在链表前面增加一个节点，称为头节点(header Node),只要将单向链表的尾节点与头节点链接起来，单向链表就成为了循环链表。

## 3.双向链表

每个元素节点既有指向后继的指针，又有指向前驱的指针，双向链表就是这样一个有序的节点序列。
每一个节点都有两个指针next和previous。next指针指向右边节点，previous指针指向左边节点。

## 3.链表的应用

### 3.1 箱子排序(bin sort)

例:假设要对一个班级的学生的总分进行排序，如果使用冒泡、选择或者插入排序，时间复杂度都为**O(n^2^)**。现在我们使用箱子排序，这种排序首先把份数相同的节点放在同一个箱子里，然后把箱子链接起来就得到了有序的链表。

- 每一个箱子都是一个链表，一个箱子的节点数目在0~n之间。开始时，箱子是空的。
  箱子排序需要做的事情是:

1. 逐个删除输入链表的节点，把删除的节点分配到对应的箱子里；
2. 把每一个箱子里的链表收集并链接起来，使其成为一个有序链表。

下面以为学生成绩总分排序为例

```C++
//先为学生记录定义一个结构体studentRecord
struct studentRecord
{
    int score;
    string* name;

    int operator !=(const studentRecord& x) const
    {return (score!=x.score);}
    operator int() const {return score;}
};
ostream& operator<<(ostream& out,const studentRecord& x)
{out<<x.score<<" "<<*x.name<<endl>>;return out;}

//使用链表的多个方法进行箱子排序
void binSort(chain<structRecord>& theChain,int range)
{
    //对箱子初始化
    chain<structRecord> *bin;
    bin = new chain<structRecord>[range+1];

    //把学生从链表里取出，放进各个箱子里
    int numbersofElements = theChain.size();
    for (int i=1;i<=numbersofElemnts;i++){
        studentRecord x=theChain.get(0);
        theChain.erase(0);
        bin[x.score].insert(0,x);
    }

    //从箱子中收集元素
    for(int j=range;j>=0;j--){
        while(!bin[j].empty()){
            studentRecord x=bin[j].get(0);
            bin[j].erase(0);
            theChain.insert(0,x)
        }
    }

    delete []bin;
}
```

箱子排序作为链表chain的一个成员函数

```C++
template<class T>
void chain<T>::binSort(int range)
{
    //创建并初始化箱子
    chainNode<T>**bottom,**top;
    bottom=new chainNode<T>* [range+1];
    top=new chainNode<T>* [range+1];
    for(int b=0;b<=range;b++)
        bottom[b]=NULL;

    //把链表的节点分配到箱子
    for(;firstNode!=NULL;firstNode=firstNode->next)
    {//把首节点firstNode加入到箱子中
        int theBin=firstNode->element;
        if(bottom[theBin]==NULL)//箱子为空
            bottom[theBin]=top[theBin]=firstNode;
        else{//箱子不空
            top[theBin]->next=firstNode;
            top[theBin]=firstNode;
        }
    }

    //把箱子中的节点收集到有序链表中
    chainNode<T> *y=NULL;
    for(int theBin=0;theBin<=range;theBin++){
        if(bottom[theBin]!=NULL){
            if(y==NULL)//第一个非空箱子
                firstNode=bottom[theBin];
            else//不是第一个非空箱子
                y->next=bottom[theBin];
            y=top[theBin];
        }
        if(y!=NULL)
            y->next=NULL;
    }

    delete []top;
    delete []bottom;
}
```

- 总时间复杂度**O(n+range)**。
- 该成员函数不会改变分数相同的节点之间的相对次序。
  **如果一个排序方法能够保持同值元素之间的相对次序，则该方法称为稳定排序(stable sort)**。

### 3.2 基数排序(radix sort)

基数排序（Radix Sort）是一种非比较型的排序算法，它通过逐位比较元素的每一位（从最低位到最高位）来实现排序。基数排序的核心思想是将整数按位数切割成不同的数字，然后按每个位数分别进行排序。基数排序的时间复杂度为 O(n \* k)，其中 n 是列表长度，k 是最大数字的位数。

```C++
int maxbit(int data[], int n) //辅助函数，求数据的最大位数
{
    int maxData = data[0];              ///< 最大数
    /// 先求出最大数，再求其位数，这样有原先依次每个数判断其位数，稍微优化点。
    for (int i = 1; i < n; ++i)
    {
        if (maxData < data[i])
            maxData = data[i];
    }
    int d = 1;
    int p = 10;
    while (maxData >= p)
    {
        //p *= 10; // Maybe overflow
        maxData /= 10;
        ++d;
    }
    return d;
}
template<class T>
void chain<T>::radixSort(int d)  // d为最大位数
{
    // 创建并初始化10个箱子（0-9）
    chainNode<T>** bottom, **top;
    bottom = new chainNode<T>* [10];
    top = new chainNode<T>* [10];

    int radix = 1;  // 当前处理的位数：1,10,100,...

    // 进行d次分配和收集
    for (int i = 0; i < d; i++) {
        // 初始化箱子
        for (int b = 0; b < 10; b++)
            bottom[b] = NULL;

        // 把链表的节点分配到箱子
        for (; firstNode != NULL; firstNode = firstNode->next) {
            // 计算当前位的数字
            int theBin = (firstNode->element / radix) % 10;

            if (bottom[theBin] == NULL)  // 箱子为空
                bottom[theBin] = top[theBin] = firstNode;
            else {  // 箱子不空
                top[theBin]->next = firstNode;
                top[theBin] = firstNode;
            }
        }

        // 把箱子中的节点收集到有序链表中
        chainNode<T>* y = NULL;
        for (int theBin = 0; theBin < 10; theBin++) {
            if (bottom[theBin] != NULL) {
                if (y == NULL)  // 第一个非空箱子
                    firstNode = bottom[theBin];
                else  // 不是第一个非空箱子
                    y->next = bottom[theBin];
                y = top[theBin];
            }
        }
        if (y != NULL)
            y->next = NULL;

        radix *= 10;  // 处理下一位
    }

    delete[] top;
    delete[] bottom;
}
/*基数排序实则是对所要排序的所有数的每一位数字使用箱子排序*/
```

### 3.3 并查集

#### 3.3.1 等价类的定义

在集合论中，如果在一个集合 S上定义了一个等价关系 ∼即满足自反性、对称性、传递性的关系），那么对于 S中的任意元素 a，a的等价类就是所有与 a等价的元素组成的集合，记作：
[a]={x∈S∣x∼a}
关键性质：集合S中的所有元素会被这些等价类完全划分（不相交且覆盖全集），这就是著名的“商集”概念。

#### 3.3.2 等价类的分类

1. 离线等价类(offline equiralence class):

- 定义：在算法开始执行之前，所有的数据（元素个数、所有“等价对”关系）都已经完整地存储在内存中。算法读完所有数据后，一次性计算出所有的等价类划分。
- 核心数据结构：静态数组 + 深度优先搜索（DFS）/ 广度优先搜索（BFS），或者先读取全部数据再构建并查集。

2. 在线等价类(online equiralence class)

- 定义：算法运行的过程中，等价关系是逐步（动态）给出的。每给出一个新关系，程序必须立即更新当前元素所属的等价类，并能够随时回答“这两个元素当前是否等价？”这个问题。算法不知道未来还会输入什么关系。
- 核心数据结构：并查集（Union-Find）。它专门用来高效处理这种动态合并、即时查询的问题（近乎O(1)的时间复杂度）。

#### 3.3.3 链表实现的并查集

```C++
// 链表节点
template<class T>
struct chainNode {
    T element;
    chainNode<T>* next;
    chainNode() : next(NULL) {}
    chainNode(const T& element) : element(element), next(NULL) {}
};

// 并查集类（链表实现）
template<class T>
class UnionFind {
private:
    chainNode<T>** head;    // head[i] 指向元素 i 所在链表的头结点
    chainNode<T>** tail;    // tail[i] 指向元素 i 所在链表的尾结点
    int* length;            // length[i] 记录以 i 为头结点的链表长度
    int capacity;           // 元素个数

public:
    // 构造函数：初始化 n 个元素，每个自成一个等价类
    UnionFind(int n) : capacity(n) {
        head = new chainNode<T>*[n + 1];
        tail = new chainNode<T>*[n + 1];
        length = new int[n + 1];

        for (int i = 1; i <= n; i++) {
            head[i] = new chainNode<T>(i);
            tail[i] = head[i];
            length[i] = 1;
        }
    }

    // 析构函数：释放内存
    ~UnionFind() {
        for (int i = 1; i <= capacity; i++) {
            if (head[i] != NULL) {
                chainNode<T>* p = head[i];
                while (p != NULL) {
                    chainNode<T>* q = p;
                    p = p->next;
                    delete q;
                }
            }
        }
        delete[] head;
        delete[] tail;
        delete[] length;
    }

    // 查找：返回元素 x 所在链表的头结点（O(1)）
    chainNode<T>* find(int x) {
        return head[x];
    }

    // 合并：将 x 和 y 所在集合合并（短链并入长链）
    void unite(int x, int y) {
        chainNode<T>* headX = find(x);
        chainNode<T>* headY = find(y);

        if (headX == headY) return;  // 已在同一集合

        int rootX = headX->element;
        int rootY = headY->element;

        // 保证 rootX 是短链，rootY 是长链
        if (length[rootX] > length[rootY]) {
            chainNode<T>* tempHead = headX;
            headX = headY;
            headY = tempHead;

            int tempRoot = rootX;
            rootX = rootY;
            rootY = tempRoot;
        }

        // 将短链（rootX）接到长链（rootY）尾部
        tail[rootY]->next = headX;
        tail[rootY] = tail[rootX];

        // 遍历短链，更新所有元素的 head 指针
        chainNode<T>* p = headX;
        while (p != NULL) {
            head[p->element] = headY;
            p = p->next;
        }

        // 更新长度
        length[rootY] += length[rootX];
        length[rootX] = 0;
    }
};
```
