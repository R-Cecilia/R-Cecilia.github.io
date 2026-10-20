---
title: "12. 图的存储：邻接矩阵与邻接表"
chapter_title: "图的存储：邻接矩阵与邻接表"
weight: 12

date: 2026-08-09T13:10:00+08:00
lastmod: 2026-08-09T15:13:00+08:00

categories: ["数据结构"]
tags: ["图", "邻接矩阵", "邻接表"]
description: "图的存储：邻接矩阵与邻接表学习笔记。"
---

## 类的实现

### 邻接矩阵类

#### 类adjacencyWDigraph

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

### 邻接链表类

#### 扩充chain类

在类chain中新增一个方法eraseElement(theVertex)。该方法搜索链表，查找顶点等于theVertex的元素。
如果找到，则删除这个元素，并返回这个元素的指针。扩充后的链表为chainGraph。

#### 类linkedGraph

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
