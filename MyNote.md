# My note in this Jira clone project 
[Visit project online](https://deploy-jira-clone.herokuapp.com)
## What I used:

### Router
1. npm install react-router-dom@5.2.0 --force
2. npm install react-router-redux@4.0.8
3. npm install history
// Note: 
BrowserRouter can not work with history, change BrowserRouter to Router
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();
### Styles
4. npm i styled-components
5. npm i sass -g
6. npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p to create tailwind.config.js and postcss.config.js
### Form
7. npm install @tinymce/tinymce-react => support text editing key=o70v2ykzygkcocst9ihtgti5i5fi030v2owgrb4hsg7gvhcf
8. npm install formik => useFormik
9. npm install yup => validation
### Call API
10. npm i axios
### Redux
11. npm i reux
12. npm i react-redux
## Middleware Saga:
13. npm i redux-saga
//    import { takeLatest } from `redux-saga/effects`
//
//    function* fetchUser(action) {
//      ...
//    }
//
//    function* watchLastFetchUser() {
//      yield takeLatest('USER_REQUESTED', fetchUser)
//    }
//
// #### Notes
//
// `takeLatest` is a high-level API built using `take` and `fork`. Here is how the helper could be implemented using the low-level Effects
//
//    const takeLatest = (patternOrChannel, saga, ...args) => fork(function*() {
//      let lastTask
//      while (true) {
//        const action = yield take(patternOrChannel)
//        if (lastTask) {
//          yield cancel(lastTask) // cancel is no-op if the task has already terminated
//        }
//        lastTask = yield fork(saga, ...args.concat(action))
//      }
//    })
14. npm i react-html-parser
15. npm install react-beautiful-dnd --save
