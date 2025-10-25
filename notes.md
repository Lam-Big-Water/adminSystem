# Install

```bash
npm i @tanstack/react-query
npm i @tanstack/react-query-devtools
```

# React Query
It is fundamentally not a data-fetching library, but rather an asynchronous state manager specifically designed for server state.

# Fundamental
```jsx
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";

/*
1. QueryClient

Manages all queries and caching as the core instance, responsible for global configurations such as data caching, invalidation, and retries.
Typically initialized once at the top level of the application.
*/
const queryClient = new QueryClient(); // Must be created outside components!

/*
2. QueryClientProvider

Injects the QueryClient instance into the React component tree, enabling child components to access React Query functionalities.
Must wrap the outermost layer of the application or modules requiring data queries.
*/ 

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProfile />
    </QueryClientProvider>
  );
}

/*
3. useQuery

Initiates data queries within a component, automatically handling loading, errors, caching, and retries.
Accepts a unique queryKey and an asynchronous queryFn for fetching data.
*/ 
import { useQuery } from "@tanstack/react-query";

function UserProfile() {
  const { data, isPending, error } = useQuery({
    queryKey: ["user"], // Unique key to identify the query
    queryFn: () => fetch("/api/user").then(res => res.json()) // Asynchronous data fetching, Smart Caching: Returns cached data if available, otherwise executes queryFn
  });

  if (isPending) return "Loading...";
  if (error) return "Error!";

  return <div>{data.name}</div>;
}
```

# Deduplication
1. **Query Key**  
   - `queryKey` is a unique identifier used to determine the identity of the cache and track dependencies.  
   - `queryKey` can be a string, array, or object. Array format is commonly used for dynamic queries (e.g., `['user', userId]`).  

2. **Caching Mechanism**  
   - React Query automatically manages the cache, deduplicating requests with the same `queryKey` to avoid redundant requests.  
   - Cache invalidation strategies (e.g., `staleTime` and `cacheTime`) can be customized. By default, data is updated in the background.  

3. **Execution Flow**  
   - On the first component render, `queryFn` is executed, and the result is stored in the cache. Subsequent components directly reuse the cached value, skipping `queryFn`.  
   - The return value of `queryFn` is cached. Even if the component is unmounted, the cached data remains for a period of time (controlled by `cacheTime`).  

4. **Cross-Component Cache Sharing**  
   - Components with the same `queryKey` share a global cache, ensuring only one `queryFn` is called.  
   - This mechanism ensures data consistency, regardless of the component's position in the application.  

5. **Observer Pattern (Underlying Principle)**  
   - Each `useQuery` creates an observer that monitors cache changes and triggers synchronized re-renders.  
   - The observer pattern is the core mechanism for data synchronization and efficient updates in React Query.  

6. **Key Features**  
   - **Global Cache**: The cache is shared globally through `QueryClientProvider`.  
   - **Auto-Sync**: Observers with the same `queryKey` automatically synchronize data.  
   - **Performance**: Deduplication reduces redundant requests, improving performance.  
   - **Position Independence**: Cache access is unaffected by the component hierarchy. 

# Query States
```jsx
const { data, status } = useQuery({
    queryKey: ['mediaDevices'],
    queryFn: () => navigator.mediaDevices.enumerateDevices()
  })

  if (status === 'pending') {
    return <div>pending...</div>
  }

    if (status === 'error') {
    return <div>error</div>
  }
// boolean status
  const { data, isPending, isError } = useQuery({
    queryKey: ['mediaDevices'],
    queryFn: () => navigator.mediaDevices.enumerateDevices()
  })

    if (isPending) {
    return <div>pending...</div>
  }

  if (isError) {
    return <div>error</div>
  }
  status值       布尔标志        Promise状态
-----------------------------------------
'pending'   → isPending=true   → PENDING
'success'   → isSuccess=true   → FULFILLED
'error'     → isError=true     → REJECTED

```

# Fetching data
```jsx
function useRepos() {
  return useQuery({
    queryKey: ['repos'],
    queryFn: async () => {
      const response = await fetch('https://api.github.com/orgs/TanStack/repos')
      if (!response.ok) throw new Error(`请求失败: ${response.status}`)
      return response.json() // 自动处理Promise状态
    }
  })
}
```

# Deep Dive into Cache Mechanism
```jsx
/*
When Query Key Changes:

Observer Switches Subscription Target

Example: Switching from ['repos', { sort: 'created' }] to ['repos', { sort: 'updated' }]

Cache Existence Check

Verifies if data exists for the new key in cache

New Request Trigger (if no cache)

Initiates fresh API call when no cached data is available

Core Advantages:
✅ Automatic Deduplication

Requests with different parameters are cached independently

✅ Instant Switching

Immediate rendering of cached data when available
*/ 

async function getData (id) {
  const url = `${BASE_URL}/books/${id}`;
  const response = await fetch(url);

  if (!response.ok) throw new Error("Unable fetch data");

  const data = await response.json();

  return data;
}

function useBook (id) {
  return useQuery({
    queryKey: ["book", id],
    // notice - queryFn: getData(id) - wrong
    /*
    Immediate side effects
    Incorrect usage: queryFn: getData(id)
    Writing it this way will immediately execute getData(id) during the component's render phase, instead of waiting for React Query to fetch the data when needed.
    This violates React Query's principle of "lazy execution" and may cause side effects to occur at inappropriate times.
    Closure trap
    If you write queryFn: getData(id), the value of id will be captured by the closure. When id changes, the queryFn will still use the old id, resulting in requests being made with stale parameters.
    The correct way is queryFn: () => getData(id), so that the latest id is used every time the function is executed.
    Type mismatch
    React Query requires queryFn to be a function, not a direct value.
    getData(id) returns a Promise or data, which is not a function type.
    You must write it as () => getData(id), so that it is a function type and React Query can call it when needed.
    */
    queryFn: () => getData(id)
  })
}

 <Book bookId={selectedBookId} />

const {data, isPending, isError} = useBook(selectedBookId)

```

# Data Synchronization
staleTime (default: 0ms): The freshness threshold after which data is marked as "stale"

```jsx
useQuery({
  queryKey: ['repos', { sort }],
  queryFn: () => fetchRepos(sort),
  staleTime: 5_000, // Data remains fresh for 5 seconds
  // Optionally disable default triggers
  refetchOnWindowFocus: false 
})

// Tasks
// Create a query that marks the data stale after 5s
import {useQuery} from "@tanstack/react-query"
useQuery({
  queryKey: ["book", {bookId}],
  queryFn: () => getData(bookId),
  staleTime: 5000,
})

// When the data is stale, display the <StaleMessage />
// When the data is fetching, display the <BackgroundUpdateInProgress />
// if the data is up to date and no background update is in progress, display the <UpToDate />

const {isStale, isFetching, refetch} = useQuery({
  queryKey: ["book", {bookId}],
  queryFn: () => getData(bookId),
  staleTime: 5000,
})

function CheckState ({refetch, isStale, isFetching}) {
  // `isStale` is a derived boolean state that indicates whether cached data is considered "stale" (outdated) based on the configured staleTime.
  if (isStale) {
    // `refetch` is one of React Query's core functions, primarily used for manually triggering data re-fetching.
    return <StaleMessage refetch={refetch}/>
  }
// `isFetching` is a boolean flag that indicates whether any background data fetching is currently in progress for a query.
  if (isFetching) {
    return <BackgroundUpdateInProgress />
  }

  return <UpToDate />
}

```

# Fetching on Demand
React Query enables conditional data fetching through the enabled configuration.
```jsx
function useIssues(search) {
  return useQuery({
    queryKey: ['issues', search], // Unique cache identifier
    queryFn: () => fetchIssues(search), // Data fetching function
    enabled: search !== '' // Only activates when search term exists
  })
}
```

- Garbage Collection Mechanism  
```jsx
// React Query enhances application responsiveness through in-memory caching but requires periodic cleanup of expired cache to prevent memory issues. Its Garbage Collection (GC) system employs a time-based strategy, with a default retention period of 5 minutes (gcTime) for unused cached data.  
graph LR  
A[Component Unmounts] --> B[Observer Count Reaches Zero]  
B --> C{gcTime Countdown Starts}  
C -->|Countdown Ends| D[Data Removed from Cache]  

function useIssues(search) {  
  return useQuery({  
    queryKey: ['issues', search],  
    queryFn: () => fetchIssues(search),  
    enabled: !!search,  
    staleTime: 5000,  // Data becomes stale after 5 seconds  
    gcTime: 3000      // Inactive cache gets garbage collected after 3 seconds  
  })  
}  
```  

---

### Core Mechanism Analysis  
1. **Observer-Driven Recycling**  
   - When a component unmounts and the observer count (useQuery hooks) associated with the query reaches zero, the GC countdown is triggered.  
   - Similar to the browser's "reference counting" mechanism but based on component lifecycle.  

2. **Dual Time Threshold Control**  
   - `staleTime` (default 0): Controls data freshness, triggering background refetch after expiration.  
   - `gcTime` (default 300000ms): Determines the retention period for unused cached data.  

3. **Memory Optimization Design**  
   - The default 5-minute cache window balances "quick display" and "memory usage."  
   - GC can be completely disabled via `cacheTime: Infinity` (requires manual memory management).


# Polling Data
```jsx
Core Principles Recap
Instant Caching: Always returns cached data first (even if stale)

Default Stale Policy: staleTime defaults to 0 (all queries are immediately considered stale)


Update Triggers: Automatic refetches occur when:
• Query key changes
• New Observer mounts
• Window regains focus
• Device reconnects to network



Polling Use Case
For data requiring periodic updates (e.g., real-time dashboards), React Query provides the refetchInterval option:


useQuery({
  queryKey: ['repos', { sort }],
  queryFn: () => fetchRepos(sort),
  refetchInterval: 5000 // Polls every 5 seconds (ignores standard triggers)
})
```

### Dependent Queries  
**Core Concepts**  
While it is generally recommended to execute queries in parallel to minimize user wait times, sometimes this is not feasible. For example, when fetching movie information along with director details, the API might only return a director ID, which we then need to use to fetch the director's complete information.  

```jsx
function useMovie(title) {  
  return useQuery({  
    queryKey: ['movie', title],  
    queryFn: () => fetchMovie(title)  
  })  
}  

function useDirector(id) {  
  return useQuery({  
    queryKey: ['director', id],  
    queryFn: () => fetchDirector(id),  
    enabled: id !== undefined // Key: Only enables the query when an ID is available  
  })  
}  

function useMovieWithDirectorDetails(title) {  
  const movie = useMovie(title)  
  const directorId = movie.data?.director  
  const director = useDirector(directorId)  
    
  return { movie, director }  
}  
```  

---

### Core Mechanism Analysis  
1. **Implementation of Dependent Queries**  
   - The `useMovie` query first fetches movie information, which includes the director ID.  
   - The `useDirector` query depends on the director ID and is only enabled when the ID is available.  

2. **Key Point: `enabled` Parameter**  
   - `enabled: id !== undefined` ensures that the `useDirector` query does not execute until the director ID is obtained, avoiding unnecessary API calls.  

3. **Use Cases**  
   - Suitable for scenarios where sequential query execution is required, such as fetching movie information followed by director details.  


### Parallel Queries  
**Core Features**  
1. **Maintain Independent Cache**  
   - Each query has an independent cache, ensuring data isolation and efficient management.  
2. **Support Dynamic Query Arrays**  
   - Allows dynamic generation of query arrays, suitable for scenarios requiring simultaneous execution of multiple queries.  
3. **Aggregate Results via the `combine` Option**  
   - Uses the `combine` function to aggregate the results of multiple queries into a unified response.  

```jsx
function useBookDetails(bookId) {

  return useQueries({
    queries: [
      {
        queryKey: ["book", {bookId}],
        queryFn: () => getBookById(bookId),
      },
      {
        queryKey: ["reviews", {bookId}],
        queryFn: () => getReviewByBook(bookId),
      },
    ],
    combine: (queries) => {
      const isPending = queries.some((query) => query.status === "pending");
      const isError = queries.some((query) => query.status === "error");
      const [book, reviews] = queries.map((query) => query.data);
      console.log(isPending)

      return {
        isPending,
        isError,
        book,
        reviews
      }
    }
  });

}
```  

---

### Core Mechanism Analysis  
1. **Independent Cache**  
   - `queryKey` ensures each query's cache is independent, avoiding data conflicts.  
2. **Dynamic Query Arrays**  
   - The `queries` array supports dynamic generation, catering to multi-query needs in different scenarios.  
3. **Result Aggregation**  
   - The `combine` function aggregates the status and data of multiple queries, simplifying data processing logic.  

---

### Use Cases  
- Suitable for scenarios requiring simultaneous retrieval of multiple related data, such as fetching book information and its reviews.  
- The `combine` function enables unified handling of query status and results, improving code readability and maintainability.  

---

### Optimization Suggestions  
- If query results do not change frequently, consider extending `staleTime` and `gcTime` to reduce redundant queries.  
- In complex scenarios, use `useQueries` to batch process multiple queries, enhancing performance.




# Avoiding Loading States
Implementation Method
By listening to the onMouseEnter event of a link to trigger prefetching:
```jsx
<a
  onClick={() => setPath(post.path)}
  href="#"
  onMouseEnter={() => {
    queryClient.prefetchQuery({
      /*
      Background
queryClient is the core object in React Query, used to manage queries, caching, and data states. Through the useQueryClient hook, we can obtain the queryClient instance in a component without manually creating or passing it.
Why Avoid Directly Destructuring Properties?
Directly destructuring properties of queryClient may increase code coupling and reduce maintainability. By using useQueryClient to get the instance, we ensure code clarity and flexibility.
Example
Suppose you have a shopping cart application where you need to manage product data across multiple components. You can use useQueryClient to get the queryClient instance and centrally manage product queries and caching, rather than recreating queryClient in each component.*/ 
      queryKey: ['posts', post.path],
      queryFn: () => fetchPost(post.path),
      staleTime: 5000
    })
  }}
>
  {post.title}
</a>

Use useQueryClient to get the queryClient instance
Do not destructure properties from queryClient
Abstract query options into a shared function for reusability

```

## InitialData
The Issue with initialData
Using initialData directly stores data in the cache, which may lead to partial data issues:
```jsx
function usePost(path) {
  return useQuery({
    ...getPostQueryOptions(path),
    initialData: () => {
      return queryClient.getQueryData(['posts'])
        ?.find((post) => post.path === path)
    }
  })
}
```

The placeholderData Solution
placeholderData does not persist to the cache and still triggers queryFn to fetch real data:
```jsx
function usePost(path) {
  const queryClient = useQueryClient()

  return useQuery({
    ...getPostQueryOptions(path),
    placeholderData: () => {
      return queryClient.getQueryData(['posts'])
        ?.find((post) => post.path === path)
    }
  })
}
```

Combining with Loading Indicators
Use the isPlaceholderData flag to add a loading indicator when displaying placeholder data:
```jsx
function PostDetail({ path, setPath }) {
  const { status, data, isPlaceholderData } = usePost(path)
  
  return (
    <div>
      <h1>{data.title}</h1>
      {isPlaceholderData 
        ? <div>...</div> 
        : <div dangerouslySetInnerHTML={{__html: html}} />}
    </div>
  )
}
```

Prefetch data on hover
Instantly display available partial data as placeholder
Show smooth transition while loading complete data
Render full content upon completion











# Important Defaults
1. Query instances via useQuery or useInfiniteQuery by default consider cached data as stale.
- To change this behavior, you can configure your queries both globally and per-query using the staleTime option.

2. Stale queries are refetched automatically in the background when:
    New instances of the query mount
    The window is refocused
    The network is reconnected
    The query is optionally configured with a refetch interval
- To change this functionality, you can use options like refetchOnMount, refetchOnWindowFocus, refetchOnReconnect and refetchInterval

3. Query results that have no more active instances of useQuery, useInfiniteQuery or query observers are labeled as "inactive" and remain in the cache in case they are used again at a later time.By default, "inactive" queries are garbage collected after 5 minutes.
- To change this, you can alter the default gcTime for queries to something other than 1000 * 60 * 5 milliseconds.

4. Queries that fail are silently retried 3 times, with exponential backoff delay before capturing and displaying an error to the UI.
- To change this, you can alter the default retry and retryDelay options for queries to something other than 3 and the default exponential backoff function.

# Basic
1. A query is a declarative dependency on an asynchronous source of data that is tied to a unique key. A query can be used with any Promise based method (including GET and POST methods) to fetch data from a server. If your method modifies data on the server, we recommend using Mutations instead.
- The unique key you provide is used internally for refetching, caching, and sharing your queries throughout your application.

- The result object contains a few very important states you'll need to be aware of to be productive.
```jsx
const {isFetching, isPending, isError, data, error} = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
})
```

- In addition to the `status` field, you will also get an additional `fetchStatus` property with the following options.
 - The status gives information about the data: Do we have any or not?
 - The fetchStatus gives information about the queryFn: Is it running or not?

# Query Keys
- Simple Query Keys
```jsx
// A list of todos
useQuery({ queryKey: ['todos'], ... })

// Something else, whatever!
useQuery({ queryKey: ['something', 'special'], ... })
```
- Array Keys with variables
```jsx
// An individual todo
useQuery({ queryKey: ['todo', 5], ... })

// An individual todo in a "preview" format
useQuery({ queryKey: ['todo', 5, { preview: true }], ...})

// A list of todos that are "done"
useQuery({ queryKey: ['todos', { type: 'done' }], ... })
```

- Query Keys are hashed deterministically!
```jsx
// This means that no matter the order of keys in objects, all of the following queries are considered equal:
useQuery({ queryKey: ['todos', { status, page }], ... })
useQuery({ queryKey: ['todos', { page, status }], ...})
useQuery({ queryKey: ['todos', { page, status, other: undefined }], ... })

// The following query keys, however, are not equal. Array item order matters!
useQuery({ queryKey: ['todos', status, page], ... })
useQuery({ queryKey: ['todos', page, status], ...})
useQuery({ queryKey: ['todos', undefined, page, status], ...})
```

- If your query function depends on a variable, include it in your query key
```jsx
// Note that query keys act as dependencies for your query functions. Adding dependent variables to your query key will ensure that queries are cached independently, and that any time a variable changes, queries will be refetched automatically (depending on your staleTime settings).
function Todos({ todoId }) {
  const result = useQuery({
    queryKey: ['todos', todoId],
    queryFn: () => fetchTodoById(todoId),
  })
}
```

# Query Function
- A query function can be literally any function that returns a promise. The promise that is returned should either resolve the data or throw an error.
```jsx
useQuery({ queryKey: ['todos'], queryFn: fetchAllTodos })
useQuery({ queryKey: ['todos', todoId], queryFn: () => fetchTodoById(todoId) })
useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    const data = await fetchTodoById(todoId)
    return data
  },
})
useQuery({
  queryKey: ['todos', todoId],
  queryFn: ({ queryKey }) => fetchTodoById(queryKey[1]),
})
```

# Handling and Throwing Errors
```jsx
// For TanStack Query to determine a query has errored, the query function must throw or return a rejected Promise. Any error that is thrown in the query function will be persisted on the error state of the query.
const { error } = useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    if (somethingGoesWrong) {
      throw new Error('Oh no!')
    }
    if (somethingElseGoesWrong) {
      return Promise.reject(new Error('Oh no!'))
    }

    return data
  },
})
```

# Usage with fetch and other clients that do not throw by default
```jsx
useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    const response = await fetch('/todos/' + todoId)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  },
})
```

#
```jsx
// Query keys are automatically passed to the query function: The queryKey is included in the QueryFunctionContext, eliminating the need to manually pass variables.

// Destructure to access parameters: You can destructure queryKey to retrieve dynamic variables (e.g., status and page).

// Improves code reusability: This approach allows query logic to be extracted into standalone functions, making it easier to reuse and maintain.
function Todos({ status, page }) {
  const result = useQuery({
    queryKey: ['todos', { status, page }],
    queryFn: fetchTodoList,
  })
}

// Access the key, status and page variables in your query function!
function fetchTodoList({ queryKey }) {
  const [_key, { status, page }] = queryKey
  return new Promise()
}

```

# Query Options
- You can define all possible options for a query in one place, and you'll also get type inference and type safety for all of them.
```jsx
import { queryOptions } from '@tanstack/react-query'

function groupOptions(id: number) {
  return queryOptions({
    queryKey: ['groups', id],
    queryFn: () => fetchGroups(id),
    staleTime: 5 * 1000,
  })
}

// usage:

useQuery(groupOptions(1))
```

# Network Mode
- TanStack Query provides three different network modes to distinguish how Queries and Mutations should behave

- Network Mode:online
Online Mode (Default): Queries and mutations only execute when the device is online.

fetchStatus States:

fetching → The request is in progress.

paused → Paused due to offline status, automatically resumes when reconnected.

idle → Not running.

Avoid relying solely on pending to determine loading state. Combine it with fetchStatus (e.g., paused means the request may not have actually been sent).

Behavior After Going Offline:

Ongoing requests pause and resume (not restart) upon reconnection.

If a query is manually canceled, it will not resume.

- Network Mode:always
In this mode, TanStack Query will always fetch and ignore the online / offline state.

use for: you don't need an active network connection for your Queries to work

Queries will never be paused because you have no network connection.

Retries will also not pause - your Query will go to error state if it fails.

refetchOnReconnect defaults to false in this mode, because reconnecting to the network is not a good indicator anymore that stale queries should be refetched. You can still turn it on if you want.

- Network Mode:offlineFirst
This mode is the middle ground between the first two options, where TanStack Query will run the queryFn once, but then pause retries. This is very handy if you have a serviceWorker that intercepts a request for caching like in an offline-first PWA, or if you use HTTP caching via the Cache-Control header.

In those situations, the first fetch might succeed because it comes from an offline storage / cache. However, if there is a cache miss, the network request will go out and fail, in which case this mode behaves like an online query - pausing retries.

- Devtools
The TanStack Query Devtools will show Queries in a paused state if they would be fetching, but there is no network connection. There is also a toggle button to Mock offline behavior. Please note that this button will not actually mess with your network connection

```jsx
networkMode: 'online' | 'always' | 'offlineFirst'
optional
defaults to 'online'

```

# parallel Queries
- When the number of parallel queries does not change, there is no extra effort to use parallel queries. Just use any number of TanStack Query's useQuery and useInfiniteQuery hooks side-by-side!

- When using React Query in suspense mode, this pattern of parallelism does not work, you'll either need to use the useSuspenseQueries hook (which is suggested)

# Dynamic Parallel Queries with `useQueries`
- TanStack Query provides a `useQueries` hook, which you can use to dynamically execute as many queries in parallel as you'd like.

useQueries accepts an options object with a queries key whose value is an array of query objects. It returns an array of query results:
```jsx
function App({ users }) {
  const userQueries = useQueries({
    queries: users.map((user) => {
      return {
        queryKey: ['user', user.id],
        queryFn: () => fetchUserById(user.id),
      }
    }),
  })
}
```


