---
title: "10. 二叉树：抽象接口与链式实现"
chapter_title: "二叉树：抽象接口与链式实现"
weight: 10

date: 2026-08-01T13:10:00+08:00
lastmod: 2026-08-01T15:13:00+08:00

categories: ["数据结构"]
tags: ["二叉树", "抽象数据类型", "链式实现"]
description: "二叉树：抽象接口与链式实现学习笔记。"
---

## 抽象数据类型binaryTree

```C++
/*表述抽象数据类型的C++抽象类binaryTree*/
template<class T>
class binaryTree
{
  public:
    virtual ~binaryTree() {}
    virtual bool empty() const = 0;
    virtual int size() const = 0;
    virtual void preOrder(void(*)(T *)) = 0;
    virtual void inOrder(void(*)(T *)) = 0;
    virtual void postOrder(void(*)(T *)) = 0;
    virtual void levelOrder(void(*)(T *)) = 0;
};
```

## 类linkedBinaryTree

```C++
template<class E>
class linkedBinaryTree : public binaryTree<binaryTreeNode<E>>
{
  public:
    linkedBinaryTree(){root=NULL;treeSize=0;}
    ~linkedBinaryTree(){erase();};
    bool empty(){return treeSize==0;}
    int size(){return treeSize;}
    void preOrder(void(*theVisit)(binaryTreeNode<E>*))
      {visit=theVist;preOrder(root);}
    void inOrder(void(*theVisit)(binaryTreeNode<E>*))
      {visit=theVist;inOrder(root);}
    void postOrder(void(*theVisit)(binaryTreeNode<E>*))
      {visit=theVist;postOrder(root);}
    void levelOrder(void(*theVisit)(binaryTreeNode<E>*));
    void erase()
    {
      postOrder(dispose);
      root=NULL;
      treeSize=0；
    }
    void preOrderOutput()
    {preOrder(output);cout<<endl;}  //按前序顺序输出二叉树节点
    int height() const {return height(root);}
  private:
    binaryTreeNode<E> *root;  //指向根的指针
    int treeSize; //树的节点个数
    static void (*visit)(binaryTreeNode<E>*); //访问函数
    static void preOrder(binaryTreeNode<E>* t);
    static void inOrder(binaryTreeNode<E>* t);
    static void postOrder(binaryTreeNode<E>* t);
    static void dispose(binaryTreeNode<E>* t){delete t;}
    static void output(binaryTreeNode<E>* t){cout<<t->element<<" ";}
    static int height(binaryTreeNode<E>*t);
}
/*私有递归方法时是实际上执行遍历的函数，此处以前序遍历为例*/
template<class E>
void linkedBinaryTree::preOrder(binaryTreeNode<E>* t)
{
  if(t!=NULL)
  {
    linkedBinaryTree<E>::visit(t);
    preOrder(t->leftChild);
    preOrder(t->rightChild);
  }
}

/*height利用后序遍历的方法计算二叉树高度*/
template<class E>
int linkedBinaryTree::height(binaryTreeNode<E>*t)
{//返回根为*t的二叉树的高度
  if(t==NULL)
    return 0; //空树
  int h1=height(t->leftChild);  //左树高
  int hr=height(t->rightChild); //右树高
  if(hl>hr)
    return ++hl;
  else
    return ++hr;
}
```
