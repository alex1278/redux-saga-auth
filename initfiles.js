// Sets up files for https://start.jcolemorrison.com/react-and-redux-sagas-authentication-app-tutorial/
const fs = require('fs');

const root = {
  src: {
    login: [
      'sagas.ts', 'reducer.ts', 'actions.ts', 'constants.ts', 'index.tsx'
    ],
    signup: [
      'sagas.ts', 'reducer.ts', 'actions.ts', 'constants.ts', 'index.tsx'
    ],
    widgets: [
      'sagas.ts', 'reducer.ts', 'actions.ts', 'constants.ts', 'index.tsx'
    ],
    client: [
      'reducer.ts', 'actions.ts', 'constants.ts'
    ],
    notifications: [
      'Messages.ts', 'Errors.ts'
    ],
    lib: ['api-errors.ts', 'check-auth.ts']
  },
  'index-reducer.ts': null,
  'index-sagas.ts': null
}


// Iterates through root object creating appropriate folders and files.
// Assumes you already have a <root>/src directory
Object.keys(root).forEach(rootKey => {
  if (rootKey.endsWith('.ts') || rootKey.endsWith('.tsx')) {
    fs.writeFileSync(`./${rootKey}`, `// ${rootKey}`);
  } else if (rootKey === 'src') {
    Object.keys(root.src).forEach(srcKey => {
      root.src[srcKey].forEach(filename => {
        fs.writeFileSync(`./src/${srcKey}/${filename}`, `// ${filename}`);
      })
    })
  }
});
