---
title: "3. 链表应用：箱子排序"
chapter_title: "链表应用：箱子排序"
weight: 3

date: 2026-07-18T13:10:00+08:00
lastmod: 2026-07-18T15:13:00+08:00

categories: ["数据结构"]
tags: ["链表", "箱子排序", "稳定排序"]
description: "链表应用：箱子排序学习笔记。"
---

## 链表的应用

### 箱子排序(bin sort)

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
