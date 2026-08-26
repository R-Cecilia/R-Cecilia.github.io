---
title: "26summer-w7-图"

date: 2025-08-09T13:10:00+08:00
lastmod: 2025-08-09T15:13:00+08:00

categories: ["数据结构"]
tags: ["图", "DFS", "BFS"]
description: "图和搜索算法"

cover: /images/cover20.jpg
---

# 图(graph)

## 1. 基本概念

图(graph)是一个用线或边连接在一起的的顶点或者节点的集合。
严格地说，图是有限集V和E的有序对，即G=(V,E)，其中V的元素称为顶点或节点，E的元素称为边。
每一条边连接两个不同的顶点，用元组(i,j)来表示，i和j是边所连接的两个顶点。

- 边带方向称为有向边(directed edge),反之称为无向边(undirected edge)。
- 当且仅当(i,j)是图的边，称顶点i和j是**邻接的(adjacent)**。边(i,j)**关联(incident)**于顶点i和j。
- 对于有向边(i,j)称其**关联至(incident to)**j，而**关联于(incident from)**i。节点i**邻接至(adjacent to)**j，节点j**邻接于(adjacent from)**i。
- 如果图的所有边都是无向边，则称图为**无向图(undirected graph)**，如果图的所有边都是有向边，则称图为**有向图(directed graph)**。

注意:根据定义有

- 一个图不能有重复的边。
- 一个图不可能包含形式为(i,i)的自连边，即环(loop)。

在图的一些应用中，要为每条边赋予一个表示成本的值，称其为**权**。此时，图被称为**加权无向图**或者**加权无向图**。
一个**网络(network)**经常指一个加权有向图或者加权无向图。

## 2.应用和更多概念

### 2.1 路径问题

- 一个顶点序列P=i~1~,i~2~,...,i~k~是有向图G=(V,E)的一条从i~1~到i~k~的路径，当且仅当对于每个j(1<=j<=k)，边(i~j~,i~j+1~)都在E中。
- 一条路径如果除了第一个顶点和最后一个顶点，其余所有顶点都不同，那么该路径称为一条简单路径(simple path)。
- 图或者有向图的每一条边都可以有长度，一条路径的长度是该路径所有的边长度之和。

### 2.2 生成树

设G=(V,E)是一个无向图。

- G是连通的(connected)，当且仅当G的每一对顶点之间之间都有一条路径。
- 如果H的顶点和边的集合分别是G的顶点和边的集合的子集，那么称图H是图G的子图(subgraph)。
- 一条始点和终点相同的简单路径被称为环路(cycle)。
- 没有环路的连通无向图是一颗树。
- 一个G的子图，包含G的所有顶点，且是一棵树，则称为G的生成树(spanning tree)
- 一个具有n个顶点的连通无向图，至少有n-1条边。因此，当连通网络的每一条链路的建设成本都相同时，任意一棵生成树的建设成本都可以将网络建设成本减至最小，并保证网络连通。
- 如果不同的链路有不同的建设成本，那么需要在一棵建设成本最小的生成树上建设链路。

## 3. 特性

在一个无向图中，与一个顶点i相关联的边数称为该顶点的度(degree)d~i~。
特性1:设G=(V,E)是一个无向图，令n=V，e=E,则

- d~1~+d~2~+...+d~n~=2e
- 0<=e<=n(n-1)/2

一个具有n个顶点和n(n-1)/2个边的无向图是一个完全图。

设G是一个有向图。顶点i的入度(in-degree)是指关联至该顶点的边数。顶点i的出度(out-degree)是指关联于该顶点的边数。
特性2:设G=(V,E)是一个有向图。令n=V,e=E，则

- 0<=e<=n(n-1)
- d(in)=d(out)=e

一个具有n个顶点的完全有向图恰好包含n(n-1)条有向边。

## 3.抽象数据类型garph

```C++
//对于加权图，T是边上的权的数据类型；对于无权图，T是布尔类型。
template<class T>
class graph
{
    public:
        virtual ~graph(){}

    //ADT方法
        virtual int numberOfVertices() const=0; //返回图的顶点数目
        virtual int numbersOfEdges() const=0;   //返回图的边的数目
        virtual bool existsEdge(int,int) const=0;//返回某条边是否存在
        virtual void insertEdge(edge<T>*) = 0;  //插入一条边
        virtual void eraseEdge(int,int) = 0;    //删除边(i,j)
        virtual int degree(int) const = 0;  //返回顶点i的度。只用于无向图
        virtual int inDegree(int) const =0; //返回顶点的入度
        virtual int outDegree(int) const =0;    //返回顶点的出度

    //其他方法
        virtual bool directed() const =0;   //当且仅当为有向图时，返回True
        virtual bool weighted() const =0;   //当且仅当为加权图时，返回True
        virtual vertexIterator<T>* iterator(int) =0;    //访问指定顶点的相邻顶点
};
```

补充:

- 方法insertEdge的输入数据的类型是模板类edge。模板类edge是一个抽象类，他具有方法vertex1，vertex2，weight，这些方法分别返回一个边的第一个顶点、第二个顶点和边的权。
- 模板类vertexIiterator是一个抽象类，它只包含纯析构函数和纯虚方法。

```C++
    virtual int next()=0;   //返回一个与当前指针所指顶点相邻的顶点
    virtual int next(T&)=0; //返回一个与当前指针所指顶点相邻的顶点，且关联两顶点的边的权是T&
```

## 4. 类的实现

### 4.1 邻接矩阵类

#### 4.1.1 类adjacencyWDigraph

```C++
template<class T>
class adjacencyWDigraph
{
    protected:
        int n;  //顶点个数
        int e;  //边的个数
        T **a;  //邻接数组
        T noEdge;   //表示不存在的边

    public:
        adjacencyWDigraph(int numberOfVertices = 0,T theNoEdge = 0)
        {//构造函数
            //确认顶点数的合法性
            if(numbersOfVertices<0)
                throw illegalParameterValue("number of vertices must be >=0");
            n = numebrsOfVertices;
            e = 0;
            noEdge = theNoEdge;
            make2dArray(a,n+1,n+1);
            for(int i = 1;i <= n;i++)
                //初始化邻接矩阵
                fill(a[i],a[i]+n+1,noEdge);
        }

        ~adjacencyWDigraph(){delete 2dArray(a,n+1);}
        int numbersOfVertices() const {return n;}
        int numbersOfEdge() const {return e;}
        bool directed() {return true;}
        bool weighted() {return true;}
        bool existEdge(int i,int j) const
        {//返回值为真，当且仅当(i,j)是图的一条边
            if(i<1||j<1||i>n||j>n||a[i][j]==noedge)
                return false;
            else
                return true;
        }
        void insertEdge(edge<T> *theEdge)
        {//插入边；如果该边已经存在，用theEdge->weight()修改边的权
            int v1=theEdge->vertex1();
            int v2=theEdge->vertex2();
            if(v1<1||v2<1||v1>n||v2>n||v1==v2)
            {
                ostringstream s;
                s<<"("<<v1<<","<<v2<<") is not a permissable edge";
                throw ilegalParameterValue(s.str());
            }
            if(a[v1][v2]==noEdge)
                e++;
            a[v1][v2]=theEdge->weight();
        }

        void eraseEdge(int i,int j)
        {
            if(i>=1&&j>=1&&i<=n&&j<=n&&a[i][j]!=noEdge)
            {
                a[i][j]=noEdge;
                e--;
            }
        }

        void checkVertex(int theVertex) const
        {
            if(theVertex<1||theVertex>n)
            {
                ostringstream s;
                s<<"no vertex"<<theVertex;
                throw illegalParameterValue(s.str());
            }
        }

        int degree(int theVertex) const
        {
            throw undefinedMethod("degree() undefined");
        }

        int outDegree(int theVertex) cosnt
        {//返回顶点theVertex的出度
            checkVertex(theVertex);

            //计数关联于顶点theVertex的边数
            int sum=0;
            for(int j=1;j<=n;j++)
                if(a[theVertex][j]!=noEdge)
                    sum++;

            return sum;
        }

        int inDegree(int theVertex) const
        {//返回顶点theVertex的入度
            checkVertex(theVertex);

             //计数关联于顶点theVertex的边数
             int sum=0;
             for(int j=1;j<=n;j++)
                if(a[j][theVertex]!=noEdge)
                    sum++;

            return sum;
        }
class myIterator:public vertexIterator<T>//myIterator是adjacencyWDigraph的成员类
    {
    public:
        myIterator(T* theRow,T theNoEdge,int numbersOfVertex)
        {
            row=theRow;
            noEdge=theNoEdge;
            n=numbersOfVertex;
            currentVertex=1;
        }

        ~myIterator(){}

        int next(T& theWeight)
        {//返回下一个顶点。若不存在则返回0
         //赋权值theWeight=边的权值
         //寻找下一个邻接顶点
         for(int j=currentVertex;j<=n;j++)
            if(row[j]!=noEdge)
            {
                currentVertex=j+1;
                theWeight=row[j];
                return k;
            }
            //不存在下一个邻接顶点
            cuurentVertex=n+1;
            return 0;
        }
        //next()函数与上述函数类似
        protected:
            T* row; //邻接矩阵的行
            T noEdge;   //theRow[i]==noEdge，当且仅当没有关联于顶点i的边
            int n;  //顶点数
            int cuurentVertex;
    };
    myIterator*　iterator(int theVertex)
    {//返回顶点theVertex的迭代器
        checkVertex(theVertex);
        return new myIterator(a[theVertex],noEdge,n);
    }
};
```

## 4.2 邻接链表类

### 4.2.1 扩充chain类

在类chain中新增一个方法eraseElement(theVertex)。该方法搜索链表，查找顶点等于theVertex的元素。
如果找到，则删除这个元素，并返回这个元素的指针。扩充后的链表为chainGraph。

### 4.2.2 类linkedGraph

```C++
class linkedGraph
{
    protected:
        int n;  //顶点数
        int e;  //边数
        graphChain<int> *aList  //邻接表

    public:
        linkedGraph(int numbersOfVertices = 0)
        {///构造函数
            if(numbersOfVertices<0)
                throw illegalParameterValue("numbers of vertices must be >= 0")
            n= numbersOfVertices;
            e=0
            aList=new graphChain<int> (n+1);
        }

        ~linkedGraph(){delete []aList;}
        /*
        关于numbersOfVertices,numebrsOfEdge,directed,weighted的代码与adjacencyWGigraph相同
        */
       bool existEdge(int i,int j) const
       {//返回true，当且仅当(i,j)是一条边
            if(i<1||j<1||i>n||j>n||aList[i].indexOf(j)==-1)
                return false;
            else
                return true;
       }

       void insertEdge(edge<bool> *theEdge)
       {//插入一条边
            //设置v1和v2，并检验其合法性，此处代码和adjacencyWGigraph相同

            if(aList[v1].indexOf[v2]==-1)
            {//新边
                aList[v1].insert(0,v2);
                e++;
            }
        }

        void eraseEdge(int i,int j)
            {
                if(i>=1&&j>=1&&i<=n&&j<=n)
                {
                    int *v =aList[i].eraseElement(j);
                    if(v!=NULL) //边(i,j)存在
                        e--;
                }
            }

        void checkVertex(int theVertex) const
            {//检查theVertex是否是有效顶点
                if(theVertex<1||theVertex>n)
                {
                    ostringstream s;
                    s<<"no vertex"<<theVertex;
                    throw illegalParameterValue(s.str());
                }
            }
        int degree(int theVertex) const
        {
            throw undefinedMethod("degree() undefined");
        }

        int outDegree(int theVertex) const
        {//返回顶点theVertex的出度
            checkVertex(theVertex);
            return (aList(theVertex).size());
        }

        int inDegree(int theVertex) const
        {
            checkVertex(theVertex);

            //计数顶点theVertex的入度
            int sum=0;
            for(int i=1;i<=n;i++)
            {
                if(aList[i].indexOf(theVertex)!=-1)
                    sum++;
            }

            return sum;
        }

        //迭代器代码省略
};
```

## 5. 图的遍历

从一个顶点开始搜索所有可以达到的顶点。常用的两种搜索方法:广度优先搜索(breadth first research.BFS)和深度优先搜索(depth first research)。

### 5.1 广度优先搜索

从一个顶点开始，搜索所有可到达的顶点的方法叫做广度优先搜索。这种搜索方法可由队列实现。
图的BFS和二叉树的层次遍历相似。

```C++
virtual void bfs(int v,int reach[],int label)
{//广度优先搜索。reach[i]用来标记从顶点v可到达的所有顶点
    arrayQueue<int> q[10];
    reach[v]=label;
    q.push(v);
        while(!q.empty())
        {
            //从队列中删除一个标记过的顶点
            int w=q.front();
            q.pop();

        //标记所有没有到达的邻接于顶点w的顶点
        vertexIterator<T> *iw=iterator;
        int u;
        while(u=iw->next()!=0)
        //访问顶点w的每一个相邻的顶点
            if(reach[u]==0)
            {//u是一个没有到达过的顶点
                q.push(u);
                reach[u]=label; //做到达标记
            }

        delete iw;
    }
}
```

### 5.2 深度优先搜索

深度优先搜索代码和二叉树的前序遍历很相似。
下面是公有方法graph::dfs和保护方法graph::rDfs的代码。
它假设 `graph<T>::reach` 和 `graph<T>::label` 是类 `graph` 的静态数据成员。

```C++
void dfs(int v,int reach[],int label)
{//深度优先搜索.reach[i]用来标记所有邻接于顶点v可到达的顶点
    graph<T>::reach=reach;
    graph<T>::label=label;
    rDfs(v);
}

void rDfs(int v)
{//深度优先搜索递归方法
    reach[v]=label;
    vertexIterator<T>* iv=iterator(v);
    int u;
    while((u=iv->next())!=0)
        //访问与v相邻的顶点
        if(reach[u]==0)
            rDfs(u);    //u是一个没有到达过的顶点
    delete iv;
}
```
