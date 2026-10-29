# Redux ToDo checkpoint

A small React + TypeScript ToDo app using Redux Toolkit for shared task state.

## Run it

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Use the add form to create a task, the circle to mark it done, the filters to show all/to-do/done tasks, and the pencil button to edit a task.

## Components and state

- `AddTask.tsx` adds a task with a description.
- `ListTask.tsx` filters and displays tasks.
- `Task.tsx` displays, completes, and edits one task.
- `store.ts` defines each task (`id`, `description`, `isDone`) and the Redux actions.

Run `npm run build` to type-check and create a production build.
