import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';

installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

installExtension('hgldghadipiblonfkkicmgcbbijnpeog') // immutable.js formatter
  .then((name) => console.log(`Added Extension:  ${name}`))
  .catch((err) => console.log('An error occurred: ', err));
