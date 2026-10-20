---
title: "9. 二叉树遍历：前序、中序、后序与层次"
chapter_title: "二叉树遍历：前序、中序、后序与层次"
weight: 9

date: 2026-08-01T13:10:00+08:00
lastmod: 2026-08-01T15:13:00+08:00

categories: ["数据结构"]
tags: ["二叉树", "遍历"]
description: "二叉树遍历：前序、中序、后序与层次学习笔记。"
---

## 二叉树的遍历

四种常用的遍历二叉树方法

- 前序遍历
- 中序遍历
- 后序遍历
- 层次遍历

```C++
/*visit函数*/
template<class T>
void visit(binaryTreeNode *x)
{//访问节点*x,仅输出element域
  cout<<x->element<<" ";
}
```

```C++
/*前序遍历*/
template<class T>
void preOrder(binaryTreeNode<T> *t)
{
  if(t!=NULL){
  visit(t);
  preOrder(t->leftChild);
  preOrder(t->rightChld);
  }
}
```

```C++
/*中序遍历*/
template<class T>
void inOrder(binaryTreeNode<T> *t)
{
  if(t!=NULL){
  inOrder(t->leftChild);
  visit(t);
  inOrder(t->rightChld);
  }
}
```

```C++
/*后序遍历*/
template<class T>
void postOrder(binaryTreeNode<T> *t)
{
  if(t!=NULL){
  postOrder(t->leftChild);
  postOrder(t->rightChld);
  visit(t);
  }
}
```

```C++
/*层次遍历*/
template<class T>
void levelOrder(binaryTreeNode *t)
{
  arrayQueue<binaryTreeNode<T>*> q;
  while(t != NULL)
  {
    visit(t); //访问t

    //将t的孩子插入队列
    if(t->leftChild!=NULL)
      q.push(t->leftChild);
    if(t->rightChild!=NULL)
      q.push(t->rightChild);

    //提取下一个要访问的节点
    try{t=q.front();}
    catch(queueEmpty)
    {
      return;
    }
    q.pop();
  }
}
```
