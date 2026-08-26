---
title: "26summer-w6-二叉树"

date: 2025-08-01T13:10:00+08:00
lastmod: 2025-08-01T15:13:00+08:00

categories: ["数据结构"]
tags: ["二叉树"]
description: "树和二叉树"

cover: /images/cover19.jpg
---

# 二叉树

## 1. 树的基本定义

- 一棵树t是一个非空的有限元素集合，其中一个元素为根(root)，其余的元素组成t的子树(subtree)。
- 树中没有子代的元素称为叶子(leaf)。
- 一棵树的高度(height)或者深度(depth)是树中级(level)的个数。
- 一个元素的度(degree of an element)是指其孩子的个数。一棵树的度(degree of a tree)是指其元素的度的最大值。

## 2. 二叉树

### 2.1 基本定义

- 定义: 一个二叉树(binary tree)t是有限个元素的集合(可以为空)。当二叉树非空时，其中一个元素称为根，余下的元素杯划分为两棵二叉树，分别称为t的左子树和右子树。
  注:
- 二叉树的每个元素恰好有两棵子树(其中一个或者两个可能为空)，而树的每一个元素可以有任意数量的子树。
- 在二叉树中，每个元素的子树都是有序的，也就是说，有左子树和右子树之分。而树的子树是无序的。

### 2.2 二叉树的特性

- 一棵二叉树有n个元素，n>0，它有n-1条边。
- 一棵二叉树的高度为h。h>=0，它最少有h个元素，最多有2^h^-1个元素。
- 一棵二叉树的元素有n个，n>0，它的高度最大为n，最小为[log~2~(n+1)]，(向上取整)。
  当高度为h的二叉树有2^h^-1个元素时，称其为满二叉树(full binary tree)。
  对高度为h的满二叉树的元素，从第一层到最后一层，在每一层中从左至右，顺序编号，从1到2^h^-1。
  假设从满二叉树中删除k个其编号为2^h^-i元素,1<=i<=k<2^h^，所得到的二叉树被称为完全二叉树(complete binary tree)。

- 对于完全二叉树，设其一个元素的编号为i，1<=i<=n。有以下关系成立:
  1. 如果i=1，则该元素为二叉树的根。若i>1，则其父节点的编号为[i/2]，(向下取整)。
  2. 如果2i>n，则该元素无左子树。否则，该元素的左子树的编号为2i。
  3. 如果2i+1>n，则该元素无右子树。否则，该元素的右子树的编号为2i+1。

### 2.3 链表描述

如果用数组描述二叉树，会面临空间大量浪费的情况。所以，我们一般用链表来描述二叉树。

```C++
/*链表二叉树的节点结构*/
template<class T>
struct binaryTreeNode
{
    T element;
    binaryTreeNode<T> *leftChild,*rightChild;

    binaryTreeNode()
    {
        leftChild=rigthChild=NULL;
    }
    binaryTreeNode(const T& theElment)
    {
        element(theElement);//带有一个参数，用来初始化element。
        leftChild=rigthChild=NULL;
    }
    binaryTreeNode(const T& theElement,binaryTreeNode* theLeftChild,binaryTreeNode* theRigthChild)
    {
        element(theElement);
        leftChild=theLeftChild;
        rightChild=theRightChild;
    }
};
```

### 2.4 二叉树常用操作

- 确定高度
- 确定元素数目
- 复制
- 显示或打印二叉树
- 确定两棵二叉树是否相等
- 删除整棵树
  这些操作可以通过有步骤地遍历二叉树来完成。在二叉树的遍历中，每个元素仅被访问一次。访问一个元素，意味着可以对该元素进行任何操作。

### 2.5 二叉树的遍历

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

### 2.6 抽象数据类型binaryTree

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

### 2.7类linkedBinaryTree

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
